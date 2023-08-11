import os
import shutil

HOME_PATH = os.path.expanduser("~")
MUSIC_PATH = os.path.join(HOME_PATH, "Music")
CURRENT_PATH = os.getcwd()


def remove_file(song):
    file_path = os.path.join(MUSIC_PATH, song)
    os.remove(file_path)
    print(f"File '{file_path}' has been deleted.")


def printing(message):
    COLOR_YELLOW = "\033[33m"
    COLOR_RESET = "\033[0m"
    print(COLOR_YELLOW + message + COLOR_RESET)


def get_song_name(song_name, new_song_name):
    old_song_path = f"{MUSIC_PATH}/{song_name}"
    new_song_path = f"{MUSIC_PATH}/{new_song_name}"
    os.rename(old_song_path, new_song_path)
    printing(f"{song_name} renamed to {new_song_name}")


def get_all_songs():
    content = os.listdir(CURRENT_PATH)
    songs = []

    for song in content:
        if ".mp3" in song:
            songs.append(song)
    return songs


def move_file(song_file, album_name=None):
    os.makedirs(MUSIC_PATH, exist_ok=True)
    os.makedirs(f"{HOME_PATH}/Downloads", exist_ok=True)

    song_path = f"{CURRENT_PATH}/{song_file}"

    destination_path = MUSIC_PATH

    if album_name is not None:
        destination_path = f"{MUSIC_PATH}/{album_name}"

    shutil.move(song_path, os.path.join(destination_path, os.path.basename(song_path)))


def create_new_album(album_name):
    new_album = f"{MUSIC_PATH}/{album_name}"
    os.mkdir(new_album)
    return new_album
