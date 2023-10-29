"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./Control.module.scss";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import useVideoUrlStore from "@/app/store/videoUrlStore";
import { validateVideoUrl } from "@/app/actions/video";
import { useFormState } from "react-dom";

const Control = () => {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const { videoUrl } = useVideoUrlStore();

  const [state, formAction] = useFormState(validateVideoUrl, {
    error: "",
    id: "",
  });

  useEffect(() => {
    setUrl(videoUrl);
  }, [videoUrl]);

  useEffect(() => {
    if (state.id) {
      router.push(`/youtube/${state.id}`);
    }
  }, [state, router]);

  return (
    <div className={styles.control}>
      <Toaster />
      <h1 className={styles.controlTitle}>
        Download Video and Audio from Youtube
      </h1>
      <form action={formAction} className={styles.controlForm}>
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
