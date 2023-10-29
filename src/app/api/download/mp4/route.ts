import formatFileName from "@/app/utils/formatFileName";
import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import fs from "fs";
import { downloadMp4 } from "@/app/lib/ffmpeg";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url") as string;
    const itag = searchParams.get("itag");

    const isValidUrl = ytdl.validateURL(url);
    if (!isValidUrl) {
      return NextResponse.json(
        {
          message: "Invalid youtube url",
        },
        { status: 400 }
      );
    }
    // Get video info
    const info = await ytdl.getInfo(url);
    const filename = formatFileName(info.videoDetails.title + ".mp4");

    const videoFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestvideo",
      filter: itag ? (f) => f.itag.toString() === itag : "videoonly",
    });

    const audioFormat = ytdl.chooseFormat(info.formats, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    ytdl
      .downloadFromInfo(info, { format: audioFormat })
      .pipe(fs.createWriteStream(`./public/audio.mp3`));

    const videoStream = ytdl.downloadFromInfo(info, {
      format: videoFormat,
    });

    await downloadMp4(videoStream, filename);

    return NextResponse.json({ downloadLink: `/${filename}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
