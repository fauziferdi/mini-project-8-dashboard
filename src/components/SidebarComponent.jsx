import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authLogout, fetchUserAuth } from "../redux/slices/AuthSlice";
const SidebarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(authLogout());
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchUserAuth());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-between h-screen bg-white border-e">
      <div className="px-4 py-6">
        <span className="grid w-32 h-10 text-xs rounded-lg place-content-center">
          <img src="../Hello.png" alt="" />
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/user"
              className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              User
            </Link>
          </li>

          <li>
            <Link
              to="/blog"
              className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Blog
            </Link>
          </li>

          <li>
            <Link
              to="/portofolio"
              className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Portofolio
            </Link>
          </li>

          <li>
            <Link
              to="/testimonial"
              className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Testimonial
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Contact
            </Link>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Account </span>

                <span className="transition duration-300 shrink-0 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="px-4 mt-2 space-y-1">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Details
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => handleLogout()}
                    disabled={loading}
                    className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <Link
          to="/profile"
          className="flex items-center gap-2 p-4 bg-white hover:bg-gray-50"
        >
          <img
            alt={profile?.name}
            src={profile?.photo}
            className="object-cover rounded-full size-10"
          />

          <div>
            <p className="text-xs font-medium text-gray-500">
              <strong className="block font-medium">{profile?.name}</strong>

              <span>{profile?.title} </span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarComponent;
