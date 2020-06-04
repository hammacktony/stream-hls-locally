# Local HLS Streaming

Here is a solution to create HLS streams with videos locally. There are 2 main pieces of the process: transcoder and server.


## Transcoder

The transcoder uses `ffmpeg` and `python-ffmpeg-video-streaming` to create HLS data. 

To install, run `pip3 install -r requirements.txt`.

To configure the script, there are various cli flags. Most importantly, the `input` flag and `stream_name` flags are the most important.

```
usage: stream.py [-h] -i INPUT -s STREAM_NAME [-o OUTPUT] [-k KEY] [-u URL]

optional arguments:
  -h, --help            show this help message and exit
  -i INPUT, --input INPUT
                        The path to the video file (required).
  -s STREAM_NAME, --stream_name STREAM_NAME
                        The name of the streams. (required)
  -o OUTPUT, --output OUTPUT
                        Output directory to save streams.
  -k KEY, --key KEY     The full pathname of the file where a random key will
                        be created (required). Note: The path of the key
                        shouldbe accessible from your website(e.g.
                        "/var/www/public_html/keys/enc.key")
  -u URL, --url URL     A URL (or a path) to access the key on your website.
```

To transcode some data, run `python3 stream.py -i test_data/rick.mkv -s rick` to create an HLS of the infamous rick roll video.

## Server

To install, run `npm install` or `yarn install`.

To build the UI to view the streams, run `npm run build` or `yarn run build`. The ui uses [video.js](https://videojs.com/) as the video player.

To start the server, run `./run_server.sh`. There are multiple environment variables to set the port, ui file location, and data directory for HLS streams.

To view an HLS stream, use the `stream` query param with the `stream_name` used during the trancoding process. To view the rick roll video, go to `http://localhost:8080/?stream=rick`

To view an HLS stream at a specific time (units in seconds), use the `time` query param with the time you want to seek to in the video.

The HLS stream for `http://localhost:8080/?stream=rick` is found on the page.

One can also install this via docker. Make sure to mount the data volume where the server expects data. Example of running the docker container: `docker run --rm -d  -p 8080:8080/tcp --volume "${PWD}"/data/output:/data  hlsstreamer:latest`.

## Example

There is an example application that uses OpenCV to extract frames from the HLS streams and pop them up in a window. Use the HLS stream name found when you visited `http://localhost:8080/?stream=rick.