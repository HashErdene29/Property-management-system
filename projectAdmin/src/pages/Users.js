import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Users = () => {
  const [userList, setUserList] = useState();
  const token = localStorage.getItem("token");

  useEffect (
    () => {
      let mount = true;
      axios.get("http://localhost:8080/api/v1/user", {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        if(mount){
          setUserList(response.data)
        }
      })
      return () => {
        mount = false;
      }
    }, []
  )
  return (
    <Layout>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Send approval request
              </th>
            </tr>
          </thead>
          <tbody>
  {userList && userList.map(user => (
    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {`${user.firstname} ${user.lastname}`}
      </th>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.role.role}</td>
      <td className="px-6 py-4">{user.send ? "Yes" : "No"}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Users;
