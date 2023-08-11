import os
from flask import Flask, jsonify, request, send_from_directory
from os_controller import MUSIC_PATH, remove_file
from music_downloader import downloader
from flask_cors import CORS

from music_downloader import downloader

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return jsonify({"message": "Hello world"})


@app.route("/search", methods=["POST"])
def start_download():
    data = request.get_json()

    if not data:
        return jsonify({"Error": "Invalid JSON data"}), 400

    video_url = data.get("video_url")
    albun_name = data.get("album_name")
    song_name = data.get("song_name")

    songs = downloader(
        video_url=video_url,
        album_name=albun_name or None,
        song_name=song_name or None,
    )

    return jsonify(songs)


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
    app.run(host="0.0.0.0", debug=True, port=7676)
