import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAuth } from "../redux/slices/AuthSlice";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserAuth());
  }, [dispatch]);

  return (
    <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        ></button>
      </div>
      <div class="flex flex-col items-center pb-10">
        <h1 class="mb-5 text-xl font-medium text-gray-900 dark:text-white">
          Profile
        </h1>
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={profile.photo}
          alt={profile.name}
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {profile.name}
        </h5>
        <span class="text-md text-gray-500 dark:text-gray-400">
          {profile.title}
        </span>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {profile.email}
        </span>
      </div>
    </div>
  );
};

export default ProfileComponent;
