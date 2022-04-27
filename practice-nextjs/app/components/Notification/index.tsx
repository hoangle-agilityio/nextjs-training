import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import styles from "../../styles/Notification.module.css";

interface NotificationProps {
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  type: string;
  redirectPath?: string;
}

const Notification = ({ message, type, isOpen, redirectPath }: NotificationProps) => {
  const router = useRouter();

  const handleCloseNotification = () => {
    isOpen(false);

    redirectPath && router.push(redirectPath, undefined, { shallow: true });
  }

  useEffect(() => {
    const timeoutId = setTimeout(handleCloseNotification, 3000);

    return () => {
      clearTimeout(timeoutId);
    }
  });

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <span>{message}</span>
      <span className={styles.closeNotification} onClick={handleCloseNotification}>&times;</span>
    </div>
  );
}

export default memo(Notification);
