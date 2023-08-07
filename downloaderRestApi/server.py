from flask import Flask, jsonify, send_from_directory
import os
from music_downloader import MUSIC_PATH, get_all_songs, remove_file

from music_downloader import downloader

app = Flask(__name__)


@app.route("/")
def index():
    return jsonify({"message": "Hello world"})


# Endpoint to start downloading
@app.route("/start-download")
def start_download():
    #  video_url = request.json.get("video_url")

    songs = downloader(
        video_url="https://www.youtube.com/watch?v=beLAh5dWSg4&ab_channel=LosKjarkas-Topic",
        album_name=None,
        song_name=None,
    )

    return jsonify({"message": "Download started", "songs": songs})


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
