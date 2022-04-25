import { GetServerSideProps, NextPage } from "next";
import { getUserById } from "../../../app/api";
import User from "../../../app/core/interfaces/user";
import UserManagement from "../../../app/components/User";

interface EditUserProps {
  currentUser: User;
}

const EditUser: NextPage<EditUserProps> = ({ currentUser }: EditUserProps) => {
  return <UserManagement currentUser={currentUser} />
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

export default EditUser;
