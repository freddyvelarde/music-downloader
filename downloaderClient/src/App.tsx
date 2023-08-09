import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

function App() {
  const [songName, setSongName] = useState<string>("");
  const [songlist, setSongList] = useState<string[]>([]);

  const downloadSong = async (video_url: string) => {
    const request = await fetch("http://192.168.0.9:5000/start-download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_url,
      }),
    });
    const response = await request.json();
    setSongList(response);
  };

  const download = async (songName: string) => {
    const response = await fetch(
      `http://192.168.0.9:5000/download/${songName}`,
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = songName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const onChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setSongName(e.target.value);

  const submitEventHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(songName);
    downloadSong(songName);
  };

  return (
    <>
      <form action="" onSubmit={submitEventHandler}>
        <input
          value={songName}
          type="text"
          placeholder="song link"
          onChange={onChangeEventHandler}
        />
        <button>download</button>
      </form>
      {songlist ? (
        songlist.map((i: string) => (
          <button onClick={() => download(i)}>{i}</button>
        ))
      ) : (
        <p>Theres nothing to save</p>
      )}

      <button onClick={() => console.log(songlist)}>songs</button>
    </>
  );
}

export default App;
