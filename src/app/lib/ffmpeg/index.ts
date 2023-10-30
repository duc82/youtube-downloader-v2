import ffmpeg from "fluent-ffmpeg";
import internal from "stream";

const downloadMp3 = (
  videoSource: string | internal.Readable,
  filename: string
) => {
  return new Promise((resolve: (value: string) => void, reject) => {
    ffmpeg({ source: videoSource })
      .setFfmpegPath(process.env.FFMPEG_PATH as string)
      .toFormat("mp3")
      .save(`/tmp/${filename}`)
      .on("end", function () {
        resolve("end");
      })
      .on("error", function (err, stdout, stderr) {
        reject({ message: err.message });
      });
  });
};

const downloadMp4 = (
  videoSource: string | internal.Readable,
  filename: string
) => {
  return new Promise((resolve: (value: string) => void, reject) => {
    ffmpeg()
      .setFfmpegPath(process.env.FFMPEG_PATH as string)
      .addInput(videoSource)
      .addInput(`./public/audio.mp3`)
      .videoCodec("copy")
      .toFormat("mp4")
      .save(`./public/${filename}`)
      .on("end", function () {
        resolve("end");
      })
      .on("error", function (err, stdout, stderr) {
        reject({ message: err.message });
      });
  });
};

export { downloadMp3, downloadMp4 };
