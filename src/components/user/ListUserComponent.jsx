import React, { useEffect } from "react";
import TitleComponent from "../TitleComponent";
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
        <div class="max-w-lg text-start mb-8">
          <h1 class="text-2xl font-bold sm:text-3xl">List User</h1>
        </div>
        <div>
          <a
            class="inline-block rounded border border-green-600
            bg-green-600 px-3 py-1 text-sm font-medium text-white 
            hover:bg-transparent hover:text-green-600 focus:outline-none
            focus:ring active:text-green-500"
            href="#"
          >
            Tambah
          </a>
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-left">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                No
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Foto Profil
              </th>

              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                action
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr>
                <td class="whitespace-nowrap px-4 py-2  text-gray-900">
                  {index + 1}
                </td>
                <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                  {user.name}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.title}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.email}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  <img
                    className="w-10 h-10 rounded-full text"
                    src={user.photo}
                    alt=""
                  />
                </td>

                <td className="flex items-center gap-2 p-4">
                  <a
                    className="text-yellow-500 hover:text-yellow-700"
                    href="user/edit"
                  >
                    <MdEdit />
                  </a>
                  <a
                    className="text-red-500 hover:text-red-700"
                    href="user/delete"
                  >
                    <FaTrash />
                  </a>
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
