"use server";

import { redirect } from "next/navigation";
import ytdl from "ytdl-core";

export const validateVideoUrl = async (prevState: any, formData: FormData) => {
  try {
    const url = formData.get("url") as string;
    const isValidUrl = ytdl.validateURL(url);
    if (!isValidUrl) {
      return {
        error: "Invalid youtube url",
      };
    }

    const id = ytdl.getVideoID(url);
    return { id };
  } catch (error) {
    return { error: "Failed to get video id" };
  }
};

export const getVideoById = async (id: string) => {
  try {
    const isValidId = ytdl.validateID(id);
    if (!isValidId) {
      redirect("/");
    }

    const info = await ytdl.getInfo(`https://youtube.com/watch?v=${id}`);

    return info;
  } catch (error) {
    redirect("/");
  }
};
