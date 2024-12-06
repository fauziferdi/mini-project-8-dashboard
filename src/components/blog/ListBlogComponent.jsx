import React, { useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { fetchAllBlog, deleteBlog } from "../../redux/slices/BlogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ListBlogComponent = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchAllBlog());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBlog(id))
          .then(() => {
            dispatch(fetchAllBlog());
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to delete the blog.", "error");
            console.error("Error deleting blog:", error);
          });
      }
    });
  };

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
          <h1 className="text-2xl font-bold sm:text-3xl">List Blog</h1>
        </div>
        <div>
          <Link
            className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500"
            to="/blog/add"
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
                publish
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
            {blogs?.map((blog, index) => (
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
                <td className="px-6 py-4">{blog.title}</td>
                <td className="px-6 py-4">{blog.description}</td>
                <td className="px-6 py-4">
                  {blog.published ? "Published" : "Not Published"}
                </td>

                <td className="px-6 py-4">{blog.updated_at}</td>

                <td className="flex gap-3 px-6 py-4 text-right ">
                  <Link
                    className="text-yellow-500 hover:text-yellow-700"
                    to={`/blog/edit/${blog.id}`}
                  >
                    <MdEdit />
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlogComponent;
