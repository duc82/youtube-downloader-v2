import { downloadMp3 } from "@/app/lib/ffmpeg";
import formatFileName from "@/app/utils/formatFileName";
import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url") as string;

    const isValidUrl = ytdl.validateURL(url);
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

    const filename = formatFileName(info.videoDetails.title + ".mp3");

    const format = ytdl.chooseFormat(info.formats, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    const stream = ytdl.downloadFromInfo(info, { format });
    await downloadMp3(stream, filename);

    return NextResponse.json(
      { downloadLink: `/tmp/${filename}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
