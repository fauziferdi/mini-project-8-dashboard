import React from "react";
import { useLocation } from "react-router-dom";
import ListTestimonialComponent from "../components/testimonial/LisTestimonialComponent";
import FormTestimonialComponent from "../components/testimonial/FormTestimonialComponent";

const TestimonialPage = () => {
  const location = useLocation();
  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");

  return (
    <>
      {!isAdd && !isEdit && <ListTestimonialComponent />}

      {(isAdd || isEdit) && <FormTestimonialComponent isEdit={isEdit} />}
    </>
  );
};

export default TestimonialPage;
