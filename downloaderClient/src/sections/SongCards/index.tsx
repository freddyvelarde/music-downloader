import useDownloader from "../../hooks/useDownloader";
import downloadIcon from "../../assets/download-icon.svg";
import "./song.styles.css";
import { useEffect } from "react";

export default function SongCards() {
  const { downloadSong, getAllSongs, songList } = useDownloader();

  const eventDownloadSong = (link: string) => {
    downloadSong(link);
  };

  useEffect(() => {
    getAllSongs();
  }, []);

  return (
    <div>
      {songList.length >= 1 ? (
        songList.map((link: string, index: number) => (
          <div className="card" key={index}>
            <span>{link}</span>
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
