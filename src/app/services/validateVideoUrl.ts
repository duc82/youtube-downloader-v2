import ytdl from "ytdl-core";

export default function validateVideoUrl(url?: string | null): boolean {
  if (!url) return false;
  return ytdl.validateURL(url);
}
