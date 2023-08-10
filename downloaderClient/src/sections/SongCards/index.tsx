import useHttpRequest from "../../hooks/useHttpRequest";
import downloadIcon from "../../assets/download-icon.svg";
import "./song.styles.css";

interface SongCardProps {
  songList: string[];
  setResponse: (songList: string[]) => void;
}

export default function SongCards({ songList, setResponse }: SongCardProps) {
  const { downloadSong } = useHttpRequest();

  const eventDownloadSong = (link: string) => {
    downloadSong(link);
    const responseFiltered = songList.filter((elem: string) => elem !== link);
    setResponse(responseFiltered);
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
