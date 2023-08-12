import os
from flask import Flask, jsonify, request, send_from_directory
from os_controller import (
    MUSIC_PATH,
    get_songs_from_file_system,
    remove_file,
    rename_file,
)
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

    songs = downloader(
        video_url=video_url,
    )

    return jsonify(songs)


@app.route("/songs", methods=["GET"])
def get_all_songs():
    songs = get_songs_from_file_system()
    return songs


@app.route("/rename", methods=["POST"])
def rename_song_name():
    data = request.get_json()

    song_name = data.get("song_name")
    new_song_name = data.get("new_song_name")

    if not song_name or not new_song_name:
        return jsonify({"message": "Missing 'song_name' or 'new_song_name' field."})

    res = rename_file(song_name, new_song_name)

    return jsonify({"message": res})


@app.route("/download", methods=["POST"])
def download():
    data = request.get_json()
    song_name = data.get("song_name")
    try:
        return send_from_directory(MUSIC_PATH, song_name, as_attachment=True)
    finally:
        remove_file(song_name)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=7676)
