import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { deleteUser, getAllUsers } from "../app/api";
import Button from "../app/components/Button";
import Notification from "../app/components/Notification";
import { ROUTE } from "../app/core/constants/route";
import { NOTIFICATION_TYPE } from "../app/core/constants/notification-type";
import { searching } from "../app/core/helpers/search-helper";
import NotificationProps from "../app/core/interfaces/notification";
import User from "../app/core/interfaces/user";
import styles from "../app/styles/Home.module.css";

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [users, setUsers] = useState(data);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [notification, setNotification] = useState<NotificationProps>();
  const [searchTerm, setSearchTerm] = useState("");

  // Delete user when click to button delete
  const handleDeleteUser = async (user: User): Promise<void> => {
    if (confirm("Are you sure to delete this user?")) {
      try {
        // Set notification after delete user
        setIsOpenNotification(true);
        setNotification({
          type: NOTIFICATION_TYPE.INFO,
          message: "In progress, please wait!",
        });

        await deleteUser(user.id);

        setUsers(users => users.filter(data => data.id !== user.id));

        // Set notification after delete user
        setIsOpenNotification(true);
        setNotification({
          type: NOTIFICATION_TYPE.SUCCESS,
          message: "User deleted successfully!",
        });
      } catch (error) {
        // Set notification when delete user failed
        setIsOpenNotification(true);
        setNotification({
          type: NOTIFICATION_TYPE.ERROR,
          message: `Delete data failed: ${error}`,
        });

        throw new Error(`Delete data failed: ${error}`);
      }
    }
  }

  // Filter user list by searchTerm
  const searchResult = users.filter(user => {
    return searching(user, searchTerm);
  });

  const handleCloseNotification = () => {
    setIsOpenNotification(false);
  }

  return (
    <div className={styles.app}>
      <Head>
        <title>Users</title>
        <meta name="description" content="Display all users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.appHeader}>
        <Image
          src="/images/user.png"
          alt="User Management"
          width={50}
          height={50}
          objectFit="contain"
        />
        <h1 className={styles.app__heading}>User Management</h1>
      </section>
      <section className={styles.createUser}>
        <Button
          buttonName="Add User"
          type="success"
          href={ROUTE.ADD_USER}
        />
      </section>
      <section className={styles.searchUser}>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" className={styles.searchInput} onChange={event => setSearchTerm(event.target.value)} />
      </section>
      <section>
        <table className={styles.userList}>
          <thead>
            <tr>
              <th className={styles.listHead}>User Id</th>
              <th className={styles.listHead}>Name</th>
              <th className={styles.listHead}>Email</th>
              <th className={styles.listHead}>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.length === 0 ? (
              <tr>
                <td className={styles.emptyItem}>No data found!</td>
              </tr>
            ) : (
              <>
                {searchResult.map(user => (
                  <tr key={user.id}>
                    <td className={styles.listItem}>{user.id}</td>
                    <td className={styles.listItem}>{user.name}</td>
                    <td className={styles.listItem}>{user.email}</td>
                    <td className={styles.listItem}>
                      <Button
                        buttonName="View"
                        type="info"
                        href={`${ROUTE.VIEW_USER}${user.id}`}
                      />

                      <Button
                        buttonName="Edit"
                        type="primary"
                        href={`${ROUTE.EDIT_USER}${user.id}`}
                      />

                      <Button
                        buttonName="Delete"
                        type="danger"
                        onClick={() => handleDeleteUser(user)}
                      />
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </section>
      {isOpenNotification ? <Notification message={notification!.message} type={notification!.type} onClose={handleCloseNotification} /> : null}
    </div>
  );
}

export const getServerSideProps = async () => {
  const data: User[] = await getAllUsers();

  return {
    props: {
      data,
    }
  };
}

export default Home;
