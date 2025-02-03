import time
from flask import Flask, request, jsonify
import face_recognition
import cv2
import numpy as np
import base64

app = Flask(__name__)
def capture_face():
    video_capture = cv2.VideoCapture(0)

    if not video_capture.isOpened():
        print("Не удалось получить доступ к камере")
        return None

    time.sleep(1)

    ret, frame = video_capture.read()
    video_capture.release()

    if not ret:
        print("Не удалось захватить изображение с камеры")
        return None

    contrast = cv2.convertScaleAbs(frame, alpha=1.5, beta=50)

    face_encodings = face_recognition.face_encodings(contrast)

    if len(face_encodings) == 0:
        print("Лица не обнаружены")
        return None
    return base64.b64encode(face_encodings[0]).decode("utf-8")

@app.route("/capture", methods=["POST"])
def capture():
    face_vector = capture_face()
    if face_vector:
        return jsonify({"success": True, "face_vector": face_vector})
    return jsonify({"success": False})

@app.route("/verify", methods=["POST"])
def verify():
    data = request.json
    known_face_vector = base64.b64decode(data["face_vector"])

    captured_face = capture_face()
    if not captured_face:
        return jsonify({"success": False})

    captured_face_vector = base64.b64decode(captured_face)

    known_face_encoding = np.frombuffer(known_face_vector, dtype=np.float64)
    captured_face_encoding = np.frombuffer(captured_face_vector, dtype=np.float64)

    match = face_recognition.compare_faces([known_face_encoding], captured_face_encoding)

    return jsonify({"success": bool(match[0])})

@app.route("/", methods=["GET"])
def hello():
    return "Hello, World!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
