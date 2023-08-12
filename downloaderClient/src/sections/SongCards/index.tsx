import { FormEvent, useState } from "react";
import useDownloader from "../../hooks/useDownloader";
import downloadIcon from "../../assets/download-icon.svg";
import "./song.styles.css";
import { rename_song } from "../../config/endpoints";

export default function SongCards() {
  const { downloadSong, songList, getAllSongs } = useDownloader();
  const [renamingIndex, setRenamingIndex] = useState(-1);
  const [editedLink, setEditedLink] = useState("");
  const [oldSongName, setOldSongName] = useState("");

  const renameSong = async () => {
    await fetch(rename_song, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song_name: oldSongName,
        new_song_name: editedLink,
      }),
    });
    getAllSongs();
  };

  const eventDownloadSong = (link: string) => {
    downloadSong(link);
  };

  const startRename = (index: number, song: string) => {
    setRenamingIndex(index);
    setEditedLink(songList[index]);
    setOldSongName(song);
  };

  const submitEventHandler = (e: FormEvent) => {
    e.preventDefault();
    renameSong();
    setRenamingIndex(-1);
  };

  return (
    <div>
      {songList.length >= 1 ? (
        songList.map((link, index) => (
          <div className="card" key={index}>
            {renamingIndex === index ? (
              <div>
                <form onSubmit={submitEventHandler}>
                  <input
                    type="text"
                    value={editedLink}
                    onChange={(e) => setEditedLink(e.target.value)}
                  />
                  <button>rename</button>
                </form>
                <span onClick={() => setRenamingIndex(-1)} id="title-song">
                  x
                </span>
              </div>
            ) : (
              <span id="title-song" onClick={() => startRename(index, link)}>
                {link}
              </span>
            )}

            <img
              onClick={() => eventDownloadSong(link)}
              src={downloadIcon}
              alt="download-icon"
              width={20}
            />
          </div>
        ))
      ) : (
        <p id="loading">Search your song to download it.</p>
      )}
    </div>
  );
}
