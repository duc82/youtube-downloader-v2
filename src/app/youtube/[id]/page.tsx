import styles from "./page.module.scss";
import Thumbnail from "@/app/components/Result/Thumbnail/Thumbnail";
import { VideoFormat } from "@/app/type";
import Data from "@/app/components/Result/Data/Data";
import RelatedVideo from "@/app/components/Result/RelatedVideo/RelatedVideo";
import { getVideoById } from "@/app/actions/video";

interface YoutubeProps {
  params: {
    id: string;
  };
}

const Youtube = async ({ params }: YoutubeProps) => {
  const info = await getVideoById(params.id);

  const videoFormats = info.formats.filter(
    (format: VideoFormat) =>
      format.mimeType?.includes("video/mp4") &&
      format.audioBitrate === null &&
      !format.hasAudio
  );
  const audioFormat = info.formats.find(
    (format: VideoFormat) =>
      format.mimeType?.includes("audio") &&
      !format.hasVideo &&
      format.audioBitrate === 128
  );
  const related_videos = info.related_videos;
  const videoDetails = info.videoDetails;

  const thumbnailUrl =
    videoDetails?.thumbnails[videoDetails.thumbnails.length - 1].url;
  const video_title = videoDetails?.title;

  return (
    <div className={styles.result}>
      <div className="row">
        <Thumbnail title={video_title} url={thumbnailUrl} />
        <Data
          videoInfo={{
            videoFormats,
            audioFormat,
            related_videos,
            videoDetails,
          }}
        />
      </div>
      <RelatedVideo related_videos={related_videos} />
    </div>
  );
};

export default Youtube;
