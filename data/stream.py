import argparse
import datetime
import logging
import sys
import time
from pathlib import Path

import ffmpeg_streaming
from ffmpeg_streaming import Formats

logging.basicConfig(filename="streaming.log", level=logging.NOTSET, format="[%(asctime)s] %(levelname)s: %(message)s")

HLS_EXTENSION: str = "m3u8"
START_TIME: float = 0
LIVE: bool = False


def time_left(time_: float, total: float) -> str:
    if time_ != 0:
        diff_time = time.time() - START_TIME
        seconds_left = total * diff_time / time_ - diff_time
        time_left = str(datetime.timedelta(seconds=int(seconds_left))) + " left"
    else:
        time_left = "calculating..."

    return time_left


def monitor(ffmpeg, duration, time_):
    # You can update a field in your database or log it to a file
    # You can also create a socket connection and show a progress bar to users
    # logging.info(ffmpeg)
    if not LIVE:
        per = round(time_ / duration * 100)
        sys.stdout.write(
            "\rTranscoding...(%s%%) %s [%s%s]" % (per, time_left(time_, duration), "#" * per, "-" * (100 - per))
        )
        sys.stdout.flush()


def main(input: str, stream_name: str = "test", output: str = "./output", key: str = "", url: str = ""):
    """ Pass in an input location, and ffmpeg will create the HLS stream for you """

    if "/dev/video" in input:
        global LIVE
        LIVE = True

    output_path = Path(output) / stream_name / f"index.{HLS_EXTENSION}"

    global START_TIME
    START_TIME = time.time()

    video = ffmpeg_streaming.input(input)

    hls = video.hls(Formats.h264())
    hls.auto_generate_representations()

    if key and url:
        hls.encryption(key, url, 10)

    hls.output(output_path, monitor=monitor)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--input", type=str, required=True, help="The path to the video file (required).")
    parser.add_argument("-s", "--stream_name", type=str, required=True, help="The name of the streams. (required)")
    parser.add_argument("-o", "--output", type=str, default="./output", help="Output directory to save streams.")

    parser.add_argument(
        "-k",
        "--key",
        type=str,
        default="",
        help="The full pathname of the file where a random key will "
        "be created (required). Note: The path of the key should"
        "be accessible from your website(e.g. "
        '"/var/www/public_html/keys/enc.key")',
    )
    parser.add_argument(
        "-u", "--url", type=str, default="", help="A URL (or a path) to access the key on your website."
    )

    kwargs = vars(parser.parse_args())

    try:
        main(**kwargs)
    except RuntimeError as ex:
        print(ex)
