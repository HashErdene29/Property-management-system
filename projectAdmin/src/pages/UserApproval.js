import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useAlert } from 'react-alert'

const UserApproval = () => {
  const [approvalList, setApprovalList] = useState();
  const token = localStorage.getItem("token")
  const alert = useAlert()

  useEffect (
    () => {
      fetchList();
    }, []
  )

  const fetchList = () => {
    let mount = true;
      axios.get("http://localhost:8080/api/v1/user/11/approval-list", {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        if(mount){
          setApprovalList(response.data)
        }
      })
      return () => {
        mount = false;
      }
  }

  const handleButtonClick = (id) => {
    // Handle button click with the captured ID
    console.log("Button clicked for ID:", id);
    axios.get("http://localhost:8080/api/v1/user/change/" + id + "/" +true, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        if(response){
          alert.success("Success");
          fetchList();
        }
      })
  };

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
                Send approvcal request
              </th>
            </tr>
          </thead>
          <tbody>
  {approvalList && approvalList.map(user => (
    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {`${user.firstname} ${user.lastname}`}
      </th>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.role.role}</td>
      <td className="px-6 py-4">
                  <button
                    onClick={() => handleButtonClick(user.id)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Approve
                  </button>
                </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UserApproval;
