import validateVideoUrl from "@/app/services/validateVideoUrl";
import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

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
    const id = ytdl.getVideoID(url);
    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
