import React from "react";
import { useState } from "react";
import {
  addTestimonial,
  fetchTestimonialById,
  updateTestimonial,
} from "../../redux/slices/TestimonialSlice";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForms";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const FormTestimonialComponent = ({ isEdit }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { testimonial } = useSelector((state) => state.testimonials);

  const { form, handleChange, handleFileChange, setForm } = useForm({
    name: "",
    title: "",
    foto_profile: null,
    message: "",
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchTestimonialById(id));
    }
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (isEdit && testimonial) {
      console.log("data : ", testimonial);
      setForm({
        name: testimonial.name,
        title: testimonial.title,
        foto_profil: testimonial.foto_profile,
        message: testimonial.message,
      });
    }
  }, [isEdit, testimonial, setForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("message", form.message);
    if (form.foto_profile) {
      formData.append("foto_profile", form.foto_profile);
    }

    try {
      if (isEdit) {
        await dispatch(updateTestimonial({ id, data: formData }));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "testimonial updated successfully",
        });
      } else {
        await dispatch(addTestimonial(formData));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "testimonial added successfully",
        });
      }

      navigate("/testimonial");

      setForm({
        name: "",
        title: "",
        message: "",
        foto_profile: null,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Error adding/editing testimonial:", error);
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
                  {isEdit ? "Edit testimonial" : "Add testimonial"}
                </h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
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
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>

            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="foto_profile"
              >
                Upload Image Profile
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="foto_profile_help"
                id="foto_profile"
                name="foto_profile"
                onChange={handleFileChange}
                type="file"
                accept=".jpg, .jpeg, .png"
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="foto_profile_help"
              >
                JPEG, JPG or PNG
              </p>
            </div>

            <button
              type="submit"
              className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isEdit ? "Edit testimonial" : "Add testimonial"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormTestimonialComponent;
