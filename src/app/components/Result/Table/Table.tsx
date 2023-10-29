"use client";

import "./Table.scss";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { Download, Tab, VideoInfo } from "@/app/type";
import { useState } from "react";
import DownloadModal from "../Modal/DownloadModal";
import toast from "react-hot-toast";

const Table = ({ videoInfo, tab }: { videoInfo: VideoInfo; tab: Tab }) => {
  const [isActiveDownloadModal, setIsActiveDownloadModal] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const download = async ({ url, itag, type }: Download) => {
    setIsActiveDownloadModal(true);
    setDownloadLink("");
    try {
      const res = await fetch(`/api/download/${type}?url=${url}&itag=${itag}`);
      const data = await res.json();
      if (res.ok) {
        setDownloadLink(data.downloadLink);
      } else {
        toast.error(data.message);
        setIsActiveDownloadModal(false);
      }
    } catch (error) {
      setIsActiveDownloadModal(false);
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsActiveDownloadModal(false);
  };

  return (
    <>
      <DownloadModal
        active={isActiveDownloadModal}
        title={videoInfo.videoDetails?.title ?? ""}
        downloadLink={downloadLink}
        closeModal={closeModal}
      />
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
                  <button
                    type="submit"
                    className="btn-download"
                    onClick={() =>
                      download({
                        url: videoInfo.videoDetails?.video_url,
                        itag: video.itag,
                        type: "mp4",
                      })
                    }
                  >
                    <ArrowDownTrayIcon />
                    Download
                  </button>
                </td>
              </tr>
            ))}

          {tab === "Audio" && videoInfo.audioFormat && (
            <tr>
              <td>MP3 - {videoInfo.audioFormat.audioBitrate}kps</td>
              <td>
                {(+videoInfo.audioFormat.contentLength / 1024 / 1024).toFixed(
                  1
                )}{" "}
                MB
              </td>
              <td>
                <button
                  type="submit"
                  className="btn-download"
                  onClick={() =>
                    download({
                      url: videoInfo.videoDetails?.video_url,
                      itag: videoInfo.audioFormat?.itag,
                      type: "mp3",
                    })
                  }
                >
                  <ArrowDownTrayIcon />
                  Download
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
