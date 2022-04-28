import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import styles from "../../styles/Notification.module.css";

interface NotificationProps {
  message: string;
  type: string;
  onClose: () => void;
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  useEffect(() => {
    const timeoutId = setTimeout(onClose, 3000);

    return () => {
      clearTimeout(timeoutId);
    }
  });

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <span>{message}</span>
      <span className={styles.closeNotification} onClick={onClose}>&times;</span>
    </div>
  );
}

export default memo(Notification);
