import useDownloader from "../../hooks/useDownloader";
import downloadIcon from "../../assets/download-icon.svg";
import "./song.styles.css";

export default function SongCards() {
  const { downloadSong, songList } = useDownloader();

  const eventDownloadSong = (link: string) => {
    downloadSong(link);
  };

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
