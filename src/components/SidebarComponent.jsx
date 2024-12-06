import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authLogout } from "../redux/slices/AuthSlice";
const SidebarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(authLogout());
    navigate("/login");
  };

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
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="px-4 mt-2 space-y-1">
                <li>
                  <Link
                    to="/account/details"
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
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="object-cover rounded-full size-10"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">Fauzi Ferdiansyah</strong>

              <span> fauziferdiansyah@gmail.com </span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarComponent;
