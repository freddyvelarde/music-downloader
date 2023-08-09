import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import useHttpRequest from "./hooks/useHttpRequest";
import { start_download_url } from "./config/endpoints";

function App() {
  const [videoUrl, setVideoUrl] = useState<string>("");

  const { getAllSongs, downloadSong, response } = useHttpRequest<string[]>();

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
      {response.data ? (
        response.data.map((link: string, index: number) => (
          <button key={index} onClick={() => downloadSong(link)}>
            {link}
          </button>
        ))
      ) : (
        <p>Theres nothing to save</p>
      )}

      <button onClick={() => console.log(response.data)}>songs</button>
    </>
  );
}

export default App;
