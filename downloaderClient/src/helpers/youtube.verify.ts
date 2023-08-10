export default function isYouTubeLink(url: string): boolean {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;

  return youtubeRegex.test(url);
}
