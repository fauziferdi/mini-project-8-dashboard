import React, { useEffect } from "react";

import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { fetchAllPortofolio } from "../../redux/slices/PortofolioSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListPortofolioComponent = () => {
  const dispatch = useDispatch();
  const { portofolios, loading, error } = useSelector(
    (state) => state.portofolios
  );

  useEffect(() => {
    dispatch(fetchAllPortofolio());
    console.log(portofolios);
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
          <h1 className="text-2xl font-bold sm:text-3xl">List Portofolio</h1>
        </div>
        <div>
          <Link
            className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500"
            to="/portofolio/add"
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
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                created
              </th>

              <th scope="col" className="px-6 py-3">
                action
              </th>
            </tr>
          </thead>

          <tbody>
            {portofolios.map((porto, index) => (
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
                <td className="px-6 py-4">{porto.title}</td>
                <td className="px-6 py-4">{porto.description}</td>
                <td className="px-6 py-4">{porto.updated_at}</td>
                <td className="flex gap-3 px-6 py-4 text-right ">
                  <Link
                    className="text-yellow-500 hover:text-yellow-700"
                    to={`/portofolio/edit/${porto.id}`}
                  >
                    <MdEdit />
                  </Link>
                  <Link
                    className="text-red-500 hover:text-red-700"
                    to={`/portofolio/delete/${porto.id}`}
                  >
                    <FaTrash />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListPortofolioComponent;
