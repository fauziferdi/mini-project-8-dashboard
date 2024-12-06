import React, { useEffect } from "react";
import {
  addBlog,
  fetchBlogById,
  updateBlog,
} from "../../redux/slices/BlogSlice";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForms";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const FormBlogComponent = ({ isEdit }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog } = useSelector((state) => state.blogs);

  const { form, handleChange, handleFileChange, setForm } = useForm({
    title: "",
    content: "",
    meta_title: "",
    meta_desc: "",
    published: "true",
    banner: null,
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchBlogById(id));
      console.log(blog);
    }
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (isEdit && blog) {
      console.log(blog);
      setForm({
        title: blog.title,
        content: blog.content,
        meta_title: blog.meta_title,
        meta_desc: blog.meta_desc,
        published: blog.published ? "true" : "false",
        banner: null,
      });
    }
  }, [isEdit, blog, setForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("meta_title", form.meta_title);
    formData.append("meta_desc", form.meta_desc);
    formData.append("published", form.published === "true");
    if (form.banner) {
      formData.append("banner", form.banner);
    }

    try {
      if (isEdit) {
        await dispatch(updateBlog({ id, data: formData }));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Blog updated successfully",
        });
      } else {
        await dispatch(addBlog(formData));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Blog added successfully",
        });
      }

      navigate("/blog");
      setForm({
        title: "",
        content: "",
        meta_title: "",
        meta_desc: "",
        published: "true",
        banner: null,
      });
    } catch (error) {
      // Show error notification with SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Error adding/editing blog:", error);
    }
  };

  return (
    <>
      <div>
        <div className="relative p-4 overflow-x-auto bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-wrap items-center mb-4 flex-column md:flex-row">
            <div className="flex justify-between">
              <div className="max-w-lg mb-8 text-start">
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {isEdit ? "Edit Blog" : "Add Blog"}
                </h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows="4"
                value={form.content}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                htmlFor="meta_title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meta Title
              </label>
              <input
                type="text"
                id="meta_title"
                name="meta_title"
                value={form.meta_title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="meta_desc"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meta Description
              </label>
              <input
                type="text"
                id="meta_desc"
                name="meta_desc"
                value={form.meta_desc}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="published"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                published
              </label>

              <select
                id="published"
                name="published"
                value={form.published}
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="true">Published</option>
                <option value="false">Not Published</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="banner"
              >
                Upload Image Banner
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="banner_help"
                id="banner"
                name="banner"
                onChange={handleFileChange}
                type="file"
                accept=".jpg, .jpeg, .png"
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="banner_help"
              >
                JPEG, JPG or PNG
              </p>
            </div>

            <button
              type="submit"
              className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isEdit ? "Edit Blog" : "Add Blog"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormBlogComponent;
