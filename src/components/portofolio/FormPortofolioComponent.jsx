import React, { useEffect } from "react";
import {
  addPortofolio,
  fetchPortofolioById,
  updatePortofolio,
} from "../../redux/slices/PortofolioSlice";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForms";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const FormPortofolioComponent = ({ isEdit }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { portofolio } = useSelector((state) => state.portofolios);

  const { form, handleChange, handleFileChange, setForm } = useForm({
    title: "",
    content: "",
    banner: null,
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchPortofolioById(id));
    }
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (isEdit && portofolio) {
      setForm({
        title: portofolio.title,
        content: portofolio.content,
        banner: portofolio.banner,
      });
    }
  }, [isEdit, portofolio, setForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (form.banner) {
      formData.append("banner", form.banner);
    }

    try {
      if (isEdit) {
        await dispatch(updatePortofolio({ id, data: formData }));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Portofolio updated successfully",
        });
      } else {
        await dispatch(addPortofolio(formData));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Portofolio added successfully",
        });
      }

      navigate("/portofolio");

      setForm({
        title: "",
        content: "",
        banner: null,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Error adding/editing portofolio:", error);
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
                  {isEdit ? "Edit portofolio" : "Add portofolio"}
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
              {isEdit ? "Edit portofolio" : "Add portofolio"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormPortofolioComponent;
