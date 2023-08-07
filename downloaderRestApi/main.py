from logging import debug
from flask import Flask, request, jsonify, send_file
import os
from music_downloader import music_downloader

app = Flask(__name__)


@app.route("/")
def index():
    return jsonify({"message": "Hello world"})


# Endpoint to start downloading
#  @app.route("/download/", methods=["POST"])
#  def start_download():
#      video_url = request.json.get("video_url")
#
#      music_downloader(video_url)
#
#      return jsonify({"message": "Download started"})


@app.route("/download")
def download():
    file_path = os.path.join(
        "/home/erick/coding/projects/mp3-downloader-python",
        "Taylor Swift - Love Story (Live on Letterman) [mNLVMDF9mUo].mp3",
    )

    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return "File not found."


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
