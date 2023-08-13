import yt_dlp
from os_controller import printing, get_all_songs, move_file, create_new_album


def music_downloader(video_url, output_filename=None):
    ydl_opts = {
        "format": "bestaudio/best",
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                #  "preferredquality": "320", # better quality
                "preferredquality": "128",
                #  "preferredquality": "192",
            }
        ],
    }

    if output_filename:
        ydl_opts["outtmpl"] = f"{output_filename}.%(ext)s"

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])


def downloader(video_url, album_name=None, song_name=None):
    printing("Downloading your music.")
    music_downloader(video_url, song_name)
    songs_path = []
    printing("Getting all songs.")
    songs = get_all_songs()

    if album_name:
        printing(f"Creating {album_name} album.")
        create_new_album(album_name)

    for song in songs:
        move_file(song, album_name)
        songs_path.append(song)
    printing("Your music was downloaded.")
    return songs_path
