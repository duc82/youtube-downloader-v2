import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import "./Modal.scss";
import Progress from "../../Progress/Progress";

interface DownloadModalProps {
  active: boolean;
  title: string;
  downloadLink: string;
  closeModal: () => void;
}

const DownloadModal = ({
  active,
  title,
  closeModal,
  downloadLink,
}: DownloadModalProps) => {
  return (
    <div className={clsx("modal", active && "active")}>
      <div
        className={clsx("modal-overlay", active && "active")}
        onClick={closeModal}
      ></div>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="modal-close" onClick={closeModal}>
              <XMarkIcon />
            </button>
            <b className="modal-title">{title}</b>
          </div>
          <div className="modal-body">
            {downloadLink ? (
              <div className="process-result">
                <a href={downloadLink} download className={"btn-download"}>
                  <ArrowDownTrayIcon />
                  Download
                </a>
              </div>
            ) : (
              <div className="process-waiting">
                <Progress
                  progress={100}
                  striped={true}
                  animated={true}
                  text="Converting..."
                />
              </div>
            )}

            <p className="text-left">
              Thank you for using our service. If you could share our website
              with your friends, that would be a great help.{" "}
              <strong>Thank you.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
