import React from "react";
import { useLocation } from "react-router-dom";
import ListPortofolioComponent from "../components/portofolio/ListPortofolioComponent";
import FormPortofolioComponent from "../components/portofolio/FormPortofolioComponent";

const PortofolioPage = () => {
  const location = useLocation();
  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");

  return (
    <>
      {!isAdd && !isEdit && <ListPortofolioComponent />}

      {(isAdd || isEdit) && <FormPortofolioComponent isEdit={isEdit} />}
    </>
  );
};

export default PortofolioPage;
