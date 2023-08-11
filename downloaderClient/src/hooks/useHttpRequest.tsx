import { useState } from "react";
import { download_url } from "../config/endpoints";

type HttpRequestOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

function useHttpRequest() {
  const [response, setResponse] = useState<string[]>([]);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllSongs = async (url: string, options?: HttpRequestOptions) => {
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

      const responseData = await httpResponse.json();
      setResponse([...response, ...responseData]);
    } catch (err) {
      setResponse([...response, ...[]]);
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

  return { getAllSongs, downloadSong, error, loading, response, setResponse };
}

export default useHttpRequest;
