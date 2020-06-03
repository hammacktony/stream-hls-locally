import cv2


def main(stream: str):

    cap = cv2.VideoCapture(stream)
    print(f"FPS: {cap.get(cv2.CAP_PROP_FPS)}")

    while True:
        success, frame = cap.read()
        if not success:
            break

        timestamp = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000  # Units - Secods

        # Display the resulting image
        cv2.imshow("Video", frame)
        print(f"Timestamp: { timestamp }")

        # Hit 'q' on the keyboard to quit!
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    # Release handle to the webcam
    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument("-s", "--stream", type=str, required=True, help="HLS stream")

    kwargs = vars(parser.parse_args())
    main(**kwargs)
