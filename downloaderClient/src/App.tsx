import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import useHttpRequest from "./hooks/useHttpRequest";
import { start_download_url } from "./config/endpoints";
import SongCards from "./sections/SongCards";

function App() {
  const [videoUrl, setVideoUrl] = useState<string>("");

  const { getAllSongs, response, setResponse, loading, downloadSong } =
    useHttpRequest();

  const onChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setVideoUrl(e.target.value);

  const submitEventHandler = (e: FormEvent) => {
    e.preventDefault();
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
    const updatedResponse = response.slice(); // Create a shallow copy of the response array

    for (const song of response) {
      downloadSong(song);
      const indexToRemove = updatedResponse.indexOf(song);
      updatedResponse.splice(indexToRemove, 1); // Remove the song from the copied array
    }

    setResponse(updatedResponse); // Update the state with the modified array
  };

  return (
    <>
      <form action="" onSubmit={submitEventHandler}>
        <input
          value={videoUrl}
          type="text"
          placeholder="Paste here your song youtube link."
          onChange={onChangeEventHandler}
        />
        <button>download</button>
      </form>

      <SongCards songList={response} setResponse={setResponse} />

      {response.length > 1 ? (
        <button onClick={downloadAllSongs}> Download All Songs </button>
      ) : null}

      {loading ? <p>downloading songs</p> : null}
    </>
  );
}

export default App;
