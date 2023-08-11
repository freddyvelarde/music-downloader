import useHttpRequest from "../../hooks/useHttpRequest";
import downloadIcon from "../../assets/download-icon.svg";
import "./song.styles.css";
import { get_all_songs } from "../../config/endpoints";
import { useEffect, useState } from "react";

interface SongCardProps {
  // songList: string[];
  setResponse: (songList: string[]) => void;
}

export default function SongCards() {
  const { downloadSong } = useHttpRequest();
  const [songList, setSongList] = useState<string[]>([]);

  const eventDownloadSong = (link: string) => {
    downloadSong(link);
    getAllSongs();
  };

  const getAllSongs = async () => {
    try {
      const request = await fetch(get_all_songs);
      const songs = await request.json();
      setSongList(songs);
    } catch (e) {
      console.log(e);
    }
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
