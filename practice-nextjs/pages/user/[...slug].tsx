import { MutableRefObject, useRef, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { addUser } from "../../app/api";
import { USER_INFORMATION } from "../../app/core/constants/user-information";
import { VALIDATE } from "../../app/core/constants/validate";
import Button from "../../app/components/Button";
import User from "../../app/core/interfaces/user";
import styles from "../../app/styles/User.module.css";

const AddUser: NextPage = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const userNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const userEmailRef = useRef() as MutableRefObject<HTMLInputElement>;

  const router = useRouter();

  // Add user data to server
  const handleAddUser = async (userData: Partial<User>): Promise<void> => {
    try {
      await addUser(userData);

      alert("User added successfully!");
    } catch (error) {
      throw new Error(`Add data failed: ${error}`);
    }
  }

  const handleSubmitUser = async (): Promise<void> => {
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

      await handleAddUser(userData);

      router.push("/", undefined, { shallow: true });
    } catch (error) {
      console.log(error);
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

  return (
    <section className={styles.wrapper}>
      <Head>
        <title>{USER_INFORMATION.ADD}</title>
        <meta name="description" content="Add new user" />
      </Head>

      <h2 className={styles.title}>{USER_INFORMATION.ADD}</h2>

      {errors.map((error, index) => (
        <p key={index} className={styles.errorMsg}>{error}</p>
      ))}

      <div className={styles.inputGroup}>
        <label htmlFor="userName">User Name</label>
        <input ref={userNameRef} type="text" id="userName" className={styles.inputItem} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="userEmail">User Email</label>
        <input ref={userEmailRef} type="text" id="userEmail" className={styles.inputItem} />
      </div>

      <Button
        buttonName={USER_INFORMATION.ADD}
        type="success"
        onClick={() => handleSubmitUser()}
      />

      <Button
        buttonName={USER_INFORMATION.CANCEL}
        type="secondary"
        href="/"
      />
    </section>
  );
}

export async function getStaticPaths() {
  const paths = ['/user/add'];

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps() {
  return {
    props: {}
  };
}

export default AddUser;
