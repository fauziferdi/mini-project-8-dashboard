import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { fetchAllUsers } from "../../redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const ListUserComponent = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
    console.log(users);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="spinner-border text-primary fs-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="max-w-lg mb-8 text-start">
          <h1 className="text-2xl font-bold sm:text-3xl">List User</h1>
        </div>
        <div>
          <Link
            className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500"
            to="/user/add"
          >
            Tambah
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Foto Profil
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.title}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <img
                    className="w-10 h-10 rounded-full text"
                    src={user.photo}
                    alt=""
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUserComponent;
