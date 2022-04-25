import Head from "next/head";
import { useRouter } from "next/router";
import { MutableRefObject, useRef, useState } from "react";
import { addUser, updateUser } from "../../api";
import { USER_INFORMATION } from "../../core/constants/user-information";
import { VALIDATE } from "../../core/constants/validate";
import User from "../../core/interfaces/user";
import styles from "../../styles/User.module.css";
import Button from "../Button";
import Notification from "../Notification";

interface UserManagementProps {
  currentUser?: User;
  isViewUser?: boolean;
}

const UserManagement = (props: UserManagementProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [typeNotification, setTypeNotification] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const userNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const userEmailRef = useRef() as MutableRefObject<HTMLInputElement>;

  let formTitle: string;
  let description: string;

  // Add user data to server
  const handleAddUser = async (userData: Partial<User>): Promise<void> => {
    try {
      await addUser(userData);

      // Set notification after add user
      setIsOpenNotification(true);
      setTypeNotification("success");
      setNotificationMessage("User added successfully!");
    } catch (error) {
      // Set notification when add user failed
      setIsOpenNotification(true);
      setTypeNotification("error");
      setNotificationMessage(`Add data failed: ${error}`);

      throw new Error(`Add data failed: ${error}`);
    }
  }

  // Update user data to server
  const handleUpdateUser = async (userData: Partial<User>): Promise<void> => {
    try {
      await updateUser(userData);

      // Set notification after update user
      setIsOpenNotification(true);
      setTypeNotification("success");
      setNotificationMessage("User updated successfully!");
    } catch (error) {
      // Set notification when update user failed
      setIsOpenNotification(true);
      setTypeNotification("error");
      setNotificationMessage(`Update data failed: ${error}`);

      throw new Error(`Update data failed: ${error}`);
    }
  }

  const handleSubmitUser = async (currentUser: User): Promise<void> => {
    try {
      const userData: Partial<User> = {
        name: userNameRef.current.value,
        email: userEmailRef.current.value,
      };

      const errors = validate(userData);

      if (errors.length > 0) {
        setErrors(errors);
        return;
      }

      if (props.currentUser) {
        userData.id = currentUser.id;
        await handleUpdateUser(userData);
      } else {
        await handleAddUser(userData);
      }
    } catch (error) {
      // Set notification when submit data failed
      setIsOpenNotification(true);
      setTypeNotification("error");
      setNotificationMessage(`Submit data failed: ${error}`);

      throw new Error(`Submit data failed: ${error}`);
    }
  }

  // Validate for user data
  const validate = (user: Partial<User>): string[] => {
    const errors: string[] = [];

    if (user.name === VALIDATE.EMPTY_VALUE || user.email === VALIDATE.EMPTY_VALUE) {
      errors.push(VALIDATE.MESSAGE_FIELD_REQUIRED);
    }

    if (user.email && !VALIDATE.REGEX_EMAIL.test(user.email)) {
      errors.push(VALIDATE.MESSAGE_EMAIL_FORMAT);
    }

    return errors;
  }

  if (props.isViewUser) {
    formTitle = USER_INFORMATION.VIEW;
    description = "Display user detail";
  } else if (props.currentUser) {
    formTitle = USER_INFORMATION.EDIT;
    description = "Edit user";
  } else {
    formTitle = USER_INFORMATION.ADD;
    description = "Add new user";
  }

  return (
    <section className={styles.wrapper}>
      <Head>
        <title>{formTitle}</title>
        <meta name="description" content={description} />
      </Head>

      <h2 className={styles.title}>{formTitle}</h2>

      {errors.map((error, index) => (
        <p key={index} className={styles.errorMsg}>{error}</p>
      ))}

      <div className={styles.inputGroup}>
        <label htmlFor="userName">User Name</label>
        <input ref={userNameRef} type="text" readOnly={props.isViewUser} id="userName" className={styles.inputItem} defaultValue={props.currentUser?.name} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="userEmail">User Email</label>
        <input ref={userEmailRef} type="text" readOnly={props.isViewUser} id="userEmail" className={styles.inputItem} defaultValue={props.currentUser?.email} />
      </div>
      {props.isViewUser ?
        <Button
          buttonName="Edit"
          type="primary"
          href={`/user/edit/${props.currentUser?.id}`}
        /> :
        <Button
          buttonName={formTitle}
          type="success"
          onClick={() => handleSubmitUser(props.currentUser!)}
        />
      }

      <Button
        buttonName={USER_INFORMATION.CANCEL}
        type="secondary"
        href="/"
      />
      {isOpenNotification ? <Notification isRedirect={true} isOpen={setIsOpenNotification} message={notificationMessage} type={typeNotification} /> : null}
    </section>
  );
}

export default UserManagement;
