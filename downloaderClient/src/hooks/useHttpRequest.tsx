import { useState } from "react";
import { download_url } from "../config/endpoints";

type HttpRequestOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

type HttpResponse<T> = {
  data: T | null;
  error: Error | null | unknown;
  loading: boolean;
};

function useHttpRequest<T>() {
  const [response, setResponse] = useState<HttpResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const getAllSongs = async (url: string, options?: HttpRequestOptions) => {
    try {
      setResponse({ ...response, loading: true });

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
      setResponse({ data: responseData, error: null, loading: false });
    } catch (err) {
      setResponse({ data: null, error: err, loading: false });
    }
  };

  const downloadSong = async (songName: string) => {
    try {
      const response = await fetch(download_url(songName));
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

  return { getAllSongs, response, downloadSong };
}

export default useHttpRequest;
