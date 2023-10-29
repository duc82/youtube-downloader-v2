import clsx from "clsx";
import styles from "./Progress.module.scss";

const Progress = ({
  text,
  progress,
  striped = false,
  animated = false,
}: {
  text: string;
  progress: number;
  striped?: boolean;
  animated?: boolean;
}) => {
  return (
    <div className={styles.progress}>
      <div
        className={clsx(
          styles.progressBar,
          striped && styles.progressBarStriped,
          animated && styles.progressBarAnimated
        )}
        style={{ width: `${progress}%` }}
      >
        {text}
      </div>
    </div>
  );
};

export default Progress;
