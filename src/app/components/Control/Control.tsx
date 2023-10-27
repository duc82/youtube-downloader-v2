"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./Control.module.scss";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import useVideoUrlStore from "@/app/store/videoUrlStore";

const Control = () => {
  const [url, setUrl] = useState("");
  const route = useRouter();
  const { videoUrl } = useVideoUrlStore();

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/videoInfo/validate?url=${url}`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      route.push(`/youtube/${data.id}`);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    setUrl(videoUrl);
  }, [videoUrl]);

  return (
    <div className={styles.control}>
      <Toaster />
      <h1 className={styles.controlTitle}>
        Download Video and Audio from Youtube
      </h1>
      <form onSubmit={handleSubmitForm} className={styles.controlForm}>
        <input
          placeholder="Paste link here..."
          name="url"
          id="url"
          autoComplete="off"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          className={styles.controlInput}
        />
        <button type="submit" className={styles.controlButton}>
          Start
        </button>
      </form>
    </div>
  );
};

export default Control;
