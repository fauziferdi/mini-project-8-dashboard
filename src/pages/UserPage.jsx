import React from "react";
import { useLocation } from "react-router-dom";
import ListUserComponent from "../components/user/ListUserComponent";
import FormUserComponent from "../components/user/FormUserComponent";

const UserPage = () => {
  const location = useLocation();
  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");

  return (
    <>
      {!isAdd && !isEdit && <ListUserComponent />}

      {(isAdd || isEdit) && <FormUserComponent isEdit={isEdit} />}
    </>
  );
};

export default UserPage;
