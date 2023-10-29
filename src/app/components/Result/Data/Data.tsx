"use client";
import { useEffect, useState } from "react";
import styles from "./Data.module.scss";
import { VideoCameraIcon, MusicalNoteIcon } from "@heroicons/react/20/solid";
import { Tab, VideoInfo } from "@/app/type";
import Table from "../Table/Table";
import useVideoUrlStore from "@/app/store/videoUrlStore";

const Data = ({ videoInfo }: { videoInfo: VideoInfo }) => {
  const [tab, setTab] = useState<Tab>("Video");
  const { updateVideoUrl } = useVideoUrlStore();

  useEffect(() => {
    const url = videoInfo.videoDetails?.video_url;
    if (url) {
      updateVideoUrl(url);
    }
  }, [videoInfo, updateVideoUrl]);

  return (
    <div className={styles.data}>
      <ul className={styles.tabs}>
        <li
          className={`${styles.tab} ${tab === "Video" && styles.active}`}
          onClick={() => setTab("Video")}
        >
          <VideoCameraIcon />
          Video
        </li>
        <li
          className={`${styles.tab} ${tab === "Audio" && styles.active}`}
          onClick={() => setTab("Audio")}
        >
          <MusicalNoteIcon />
          Audio
        </li>
      </ul>
      <div className={styles.tabContent}>
        <Table tab={tab} videoInfo={videoInfo} />
      </div>
    </div>
  );
};

export default Data;
