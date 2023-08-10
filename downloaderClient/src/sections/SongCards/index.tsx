import useHttpRequest from "../../hooks/useHttpRequest";
import downloadIcon from "../../assets/download-icon.svg";

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
      {songList ? (
        songList.map((link: string, index: number) => (
          <div>
            <button key={index}>{link}</button>
            <img
              onClick={() => eventDownloadSong(link)}
              src={downloadIcon}
              alt="download-icon"
              width={20}
            />
          </div>
        ))
      ) : (
        <p>Theres nothing to save</p>
      )}
    </div>
  );
}
