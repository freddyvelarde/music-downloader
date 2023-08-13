import { useState } from "react";
import useDownloader from "../../hooks/useDownloader";
import downloadIcon from "../../assets/download-icon.svg";
import "./song.styles.css";
import { rename_song } from "../../config/endpoints";

export default function SongCard() {
  const { downloadSong, songList, getAllSongs } = useDownloader();
  const [renamingIndex, setRenamingIndex] = useState<number | null>(null);
  const [editedLink, setEditedLink] = useState("");
  const [oldSongName, setOldSongName] = useState("");

  const renameSong = async () => {
    try {
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
    } catch (error) {
      console.error("Error renaming song:", error);
    }
  };

  const handleDownload = (link: string) => {
    downloadSong(link);
  };

  const handleRenameStart = (index: number, song: string) => {
    setRenamingIndex(index);
    setEditedLink(songList[index]);
    setOldSongName(song);
  };

  const eventRenameSubmit = () => {
    renameSong();
    setRenamingIndex(null);
  };

  return (
    <div>
      {songList.length >= 1 ? (
        songList.map((link, index) => (
          <div className="card" key={index}>
            {renamingIndex === index ? (
              <div id="renaming-form">
                <input
                  type="text"
                  value={editedLink}
                  onChange={(e) => setEditedLink(e.target.value)}
                />
                <div id="buttons">
                  <button type="submit" onClick={eventRenameSubmit}>
                    rename
                  </button>
                  <button
                    onClick={() => setRenamingIndex(null)}
                    id="title-song"
                  >
                    x
                  </button>
                </div>
              </div>
            ) : (
              <span
                id="title-song"
                onClick={() => handleRenameStart(index, link)}
              >
                {link}
              </span>
            )}

            <img
              onClick={() => handleDownload(link)}
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
