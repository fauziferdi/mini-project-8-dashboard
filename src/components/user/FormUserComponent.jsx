import React from "react";

const FormUserComponent = () => {
  return (
    <>
      <div>
        <div className="flex justify-between">
          <div class="max-w-lg text-start mb-8">
            <h1 class="text-2xl font-bold sm:text-3xl">Tambah User</h1>
          </div>
        </div>
        <div>
          <form className="w-full max-w-lg">
            {" "}
            {/* Tambahkan form */}
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-first-name"
                >
                  Nama
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-last-name"
                >
                  Title
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="email"
                  placeholder="********"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-password"
                >
                  Photo
                </label>
                <input
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-first-name"
                >
                  Linkedin URL
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-first-name"
                  type="text"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-last-name"
                >
                  Instagram URL
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="file"
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-first-name"
                >
                  Username
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-first-name"
                  type="text"
                  placeholder="username"
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="grid-last-name"
                >
                  Password
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="password"
                  placeholder="********"
                />
              </div>
            </div>
            <button // Tambahkan tombol submit
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit" // Ubah type menjadi submit
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormUserComponent;
