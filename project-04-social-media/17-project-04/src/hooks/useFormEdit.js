import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

export const useFormEdit = (initialForm, validateForm = {}) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    // setErrors(validateForm(form));
  };

  const putImage = (idArticle) => {
    // Function code goes here
    // console.log('id', idArticle)
    const $image = document.getElementById('file')
    // console.log($image.files)

    if ($image.files.length === 0) {
      console.log("You don't select source image")
      return
    }

    let formData = new FormData()
    formData.append('file0', $image.files[0])
    console.log($image.files)

    setLoading(true);
    helpHttp()
      .post(`http://localhost:5500/api/uploadimage/${idArticle}`, {
        body: formData
      }, true)
      .then((res) => {
        setLoading(false);
        setResponse(true);
        setTimeout(() => setResponse(false), 5000);
      });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors(validateForm(form));
    console.log(form)
    if (Object.keys(errors).length === 0) {
      alert("Sending Form");
      setLoading(true);
      helpHttp()
        .put("http://localhost:5500/api/article/" + form._id, {
          body: form,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log(res)
          setLoading(false);
          setResponse(true);
          setForm({});
          setTimeout(() => setResponse(false), 5000);
          putImage(res.message._id)
        });
      // 

    } else {
      return;
    }
  };


  return {
    form,
    setForm,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
