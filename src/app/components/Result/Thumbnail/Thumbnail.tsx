import Image from "next/image";
import styles from "./Thumbnail.module.scss";

interface ThumbnailProps {
  url: string;
  title: string;
}

const Thumbnail = ({ url, title }: Partial<ThumbnailProps>) => {
  return (
    <figure className={styles.thumbnail}>
      <Image
        src={url ?? ""}
        alt="Thumbnail"
        height={0}
        width={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <figcaption className={styles.thumbnailTitle}>{title}</figcaption>
    </figure>
  );
};

export default Thumbnail;
