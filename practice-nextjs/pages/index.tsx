import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { getAllUsers } from "../app/api";
import Button from "../app/components/Button";
import User from "../app/core/interfaces/user";
import styles from "../app/styles/Home.module.css";

const Home = ({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
          href="user/add"
        />
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
            {users.length === 0 ? (
              <tr>
                <td className={styles.emptyItem}>No data found!</td>
              </tr>
            ) : (
              <>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className={styles.listItem}>{user.id}</td>
                    <td className={styles.listItem}>{user.name}</td>
                    <td className={styles.listItem}>{user.email}</td>
                    <td className={styles.listItem}>
                      <Button
                        buttonName="View"
                        type="info"
                      />

                      <Button
                        buttonName="Edit"
                        type="primary"
                        href={`/user/edit/${user.id}`}
                      />

                      <Button
                        buttonName="Delete"
                        type="danger"
                      />
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getServerSideProps = async () => {
  const users: User[] = await getAllUsers();

  return {
    props: {
      users,
    }
  };
}

export default Home;
