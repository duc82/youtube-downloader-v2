import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import "./Table.scss";
import { Tab, VideoInfo } from "@/app/type";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Table = ({ videoInfo, tab }: { videoInfo: VideoInfo; tab: Tab }) => {
  const router = useRouter();
  const download = async (url?: string) => {
    try {
      const res = await fetch(`/api/download/mp3?url=${url}`);
      const data = await res.json();
      if (res.ok) {
        router.push(`/${data.filename}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>File type</th>
          <th>File size</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tab === "Video" &&
          videoInfo.videoFormats.map((video, i) => (
            <tr key={i}>
              <td>
                {video.qualityLabel} (.mp4){"  "}
                {video.quality === "hd1080" && (
                  <span className="label label-primary">
                    <small>HD</small>
                  </span>
                )}
              </td>
              <td>{(+video.contentLength / 1024 / 1024).toFixed(1)} MB</td>
              <td>
                <Link
                  className="btn-download"
                  href={`/download/mp4?url=${videoInfo.videoDetails?.video_url}&itag=${video.itag}`}
                  target="_blank"
                >
                  <ArrowDownTrayIcon />
                  Download
                </Link>
              </td>
            </tr>
          ))}

        {tab === "Audio" && videoInfo.audioFormat && (
          <tr>
            <td>MP3 - {videoInfo.audioFormat.audioBitrate}kps</td>
            <td>
              {(+videoInfo.audioFormat.contentLength / 1024 / 1024).toFixed(1)}{" "}
              MB
            </td>
            <td>
              <button
                className="btn-download"
                onClick={() => download(videoInfo.videoDetails?.video_url)}
              >
                <ArrowDownTrayIcon />
                Download
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
