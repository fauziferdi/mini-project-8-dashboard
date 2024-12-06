import React from "react";
import { useLocation } from "react-router-dom";
import ListBlogComponent from "../components/blog/ListBlogComponent";
import FormBlogComponent from "../components/blog/FormBlogComponent";

const BlogPage = () => {
  const location = useLocation();
  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");

  return (
    <>
      {!isAdd && !isEdit && <ListBlogComponent />}

      {(isAdd || isEdit) && <FormBlogComponent isEdit={isEdit} />}
    </>
  );
};

export default BlogPage;
