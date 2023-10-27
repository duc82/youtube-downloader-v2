import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const id = params.id;
    const isValidId = ytdl.validateID(id);
    if (!isValidId) {
      return NextResponse.json(
        {
          message: "Invalid youtube id",
        },
        {
          status: 400,
        }
      );
    }

    const info = await ytdl.getInfo(`https://youtube.com/watch?v=${id}`);

    return NextResponse.json(info, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
