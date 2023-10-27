import { RelatedVideo as IRelatedVideo } from "@/app/type";
import styles from "./RelatedVideo.module.scss";
import Link from "next/link";
import Image from "next/image";

interface RelatedVideoProps {
  related_videos: IRelatedVideo[];
}

const RelatedVideo = ({ related_videos }: RelatedVideoProps) => {
  return (
    <div className={styles.related}>
      <h4 className={styles.relatedTitle}>Related Videos</h4>
      <hr className={styles.relatedHr} />
      <ul className={styles.relatedGrid}>
        {related_videos.map((related_video) => {
          const thumbnailUrl =
            related_video.thumbnails[related_video.thumbnails.length - 1].url;
          return (
            <li key={related_video.id}>
              <Link
                href={`/youtube/${related_video.id}`}
                className={styles.relatedLink}
              >
                <Image
                  src={thumbnailUrl}
                  alt={related_video.title ?? ""}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>
              <Link
                href={`/youtube/${related_video.id}`}
                className={styles.relatedLink}
              >
                {related_video.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RelatedVideo;
