import validateVideoUrl from "@/app/services/validateVideoUrl";
import formatFileName from "@/app/utils/formatFileName";
import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const load = async (ffmpeg: FFmpeg) => {
  const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.4/dist/umd";
  ffmpeg.on("log", ({ message }) => {
    console.log(message);
  });
  // toBlobURL is used to bypass CORS issue, urls with the same
  // domain can be used directly.
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    workerURL: await toBlobURL(
      `${baseURL}/ffmpeg-core.worker.js`,
      "text/javascript"
    ),
  });
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url") as string;

    const isValidUrl = validateVideoUrl(url);
    if (!isValidUrl) {
      return NextResponse.json(
        {
          message: "Invalid youtube url",
        },
        {
          status: 400,
        }
      );
    }

    const info = await ytdl.getInfo(url);

    const filename = formatFileName(info.videoDetails.video_url + ".mp3");

    const format = ytdl.chooseFormat(info.formats, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    const ffmpeg = new FFmpeg();

    await load(ffmpeg);
    await ffmpeg.writeFile(
      `${process.cwd()}/public/audio.mp3`,
      await fetchFile(format.url)
    );
    await ffmpeg.exec([
      "-i",
      `${process.cwd()}/public/audio.mp3`,
      `${process.cwd()}/public/${filename}`,
    ]);

    return NextResponse.json({ filename }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
