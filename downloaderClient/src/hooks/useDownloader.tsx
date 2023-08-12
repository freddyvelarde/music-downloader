import { useState } from "react";
import { download_url, get_all_songs } from "../config/endpoints";

type HttpRequestOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

function useDownloader() {
  const [songList, setSongList] = useState<string[]>([]);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllSongs = async () => {
    try {
      const request = await fetch(get_all_songs);
      const songs = await request.json();
      setSongList(songs);
    } catch (e) {
      console.log(e);
    }
  };

  const getSongListLength = (): number => songList.length;

  const searchSong = async (url: string, options?: HttpRequestOptions) => {
    try {
      setLoading(true);

      const httpResponse = await fetch(url, {
        method: options?.method || "GET",
        headers: options?.headers || {},
        body: JSON.stringify(options?.body),
      });

      if (!httpResponse.ok) {
        throw new Error(
          `HTTP request failed with status ${httpResponse.status}`,
        );
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadSong = async (songName: string) => {
    try {
      const requestBody = {
        song_name: songName,
      };

      const response = await fetch(download_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = songName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  const downloadAllSongs = () => {
    for (const song of songList) {
      downloadSong(song);
    }
  };

  return {
    searchSong,
    downloadSong,
    error,
    loading,
    songList,
    downloadAllSongs,
    getAllSongs,
    getSongListLength,
  };
}

export default useDownloader;
