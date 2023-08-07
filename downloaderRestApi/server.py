from flask import Flask, jsonify, request, send_from_directory
import os
from music_downloader import MUSIC_PATH, remove_file

from music_downloader import downloader

app = Flask(__name__)


@app.route("/")
def index():
    return jsonify({"message": "Hello world"})


@app.route("/start-download", methods=["POST"])
def start_download():
    video_url = request.json.get("video_url")
    algun_name = request.json.get("album_name")
    song_name = request.json.get("song_name")

    songs = downloader(
        video_url=video_url,
        album_name=algun_name or None,
        song_name=song_name or None,
    )

    return jsonify({"songs": songs})


@app.route("/download/<song>", methods=["GET"])
def download(song):
    try:
        if os.path.exists(MUSIC_PATH):
            return send_from_directory(MUSIC_PATH, song, as_attachment=True)
        else:
            return "File not found"
    finally:
        remove_file(song)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
