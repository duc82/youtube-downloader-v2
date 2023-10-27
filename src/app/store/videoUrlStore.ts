"use client";
import { create } from "zustand";

interface VideoUrlState {
  videoUrl: string;
  updateVideoUrl: (url: string) => void;
}

const useVideoUrlStore = create<VideoUrlState>((set) => ({
  videoUrl: "",
  updateVideoUrl: (url) => set(() => ({ videoUrl: url })),
}));

export default useVideoUrlStore;
