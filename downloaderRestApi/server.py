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

    songs = downloader(
        video_url=video_url,
    )

    return jsonify(songs)


@app.route("/download", methods=["POST"])
def download():
    data = request.get_json()
    song_name = data.get("song_name")
    try:
        #  new_song_name = f'{data.get("new_song_name")}.mp3'

        #  rename_song(old_song_name, new_song_name)
        return send_from_directory(MUSIC_PATH, song_name, as_attachment=True)

        #  return "renamed"
        #  return send_from_directory(MUSIC_PATH, old_song_name, as_attachment=True)
    finally:
        remove_file(song_name)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=7676)
