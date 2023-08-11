import { ChangeEvent, FormEvent, useState } from "react";
import useHttpRequest from "./hooks/useHttpRequest";
import { start_download_url } from "./config/endpoints";
import SongCards from "./sections/SongCards";
import "./styles/app.styles.css";
import isYouTubeLink from "./helpers/youtube.verify";

function App() {
  const [videoUrl, setVideoUrl] = useState<string>("");

  const { getAllSongs, response, setResponse, loading, downloadSong } =
    useHttpRequest();

  const onChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setVideoUrl(e.target.value);

  const submitEventHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!isYouTubeLink(videoUrl) || loading) {
      alert("Your link is not a youtube link or we're searching a song.");
      return;
    }
    getAllSongs(start_download_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        video_url: videoUrl,
      },
    });
    setVideoUrl("");
  };

  const downloadAllSongs = () => {
    const updatedResponse = response.slice();

    for (const song of response) {
      downloadSong(song);
      const indexToRemove = updatedResponse.indexOf(song);
      updatedResponse.splice(indexToRemove, 1);
    }

    setResponse(updatedResponse);
  };

  return (
    <>
      <form id="form" action="" onSubmit={submitEventHandler}>
        <input
          value={videoUrl}
          type="url"
          placeholder="Paste YouTube url here."
          onChange={onChangeEventHandler}
        />
        <button id="btn-search">Search</button>
      </form>

      <br />

      <SongCards />

      {response.length > 1 ? (
        <div id="btn-download-all">
          <button onClick={downloadAllSongs}> Download All Songs </button>
        </div>
      ) : null}

      {loading ? <p id="loading">Searching song...</p> : null}
    </>
  );
}

export default App;
