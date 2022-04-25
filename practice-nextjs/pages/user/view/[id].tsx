import { GetServerSideProps, NextPage } from "next";
import { getUserById } from "../../../app/api";
import UserManagement from "../../../app/components/User";
import User from "../../../app/core/interfaces/user";

interface UserDetailProps {
  currentUser: User;
}

const UserDetail: NextPage<UserDetailProps> = ({ currentUser }: UserDetailProps) => {
  return <UserManagement currentUser={currentUser} isViewUser={true} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const currentUser = await getUserById(id);

  if (!Object.keys(currentUser).length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      currentUser
    }
  };
}

export default UserDetail;
