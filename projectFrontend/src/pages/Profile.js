import React from "react";
import Layout from "../components/Layout";
import ConsumerTab from "../components/ConsumerTab";
import OwnerTab from "../components/OwnerTab";

const Profile = () => {
  const role_id = localStorage.getItem("role_id");
  const user_id = localStorage.getItem("user_id");

  return (
    <Layout>
      {role_id === "2" ? <OwnerTab /> : null}
      {role_id === "3" ? <ConsumerTab /> : null}
    </Layout>
  );
};

export default Profile;
