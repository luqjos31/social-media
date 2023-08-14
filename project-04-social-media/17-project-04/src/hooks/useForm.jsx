import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

export const useForm = (initialForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [success, setSuccess] = useState(false);

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
        console.log(res)
        setLoading(false);
        setResponse(true);
        setTimeout(() => setResponse(false), 3000);
      });
  };

  const saveDataLocalStorage = (data) => {
    // Function code goes here
    // console.log(data, "here")
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))
  };


  const handleSubmit = (e, action) => {
    e.preventDefault();
    // setErrors(validateForm(form));
    console.log(form)

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      helpHttp()
        .post(`http://localhost:5501/api/user/${action}`, {
          body: form,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          if (res.status === "success" && action == "login") {
            saveDataLocalStorage(res)
            setSuccess(true)
          }
        else
        {
          setSuccess(false)
        }
          setResponse(true)
          setLoading(false);
          setForm({});
          setTimeout(() => setResponse(false), 5000);
          // putImage(res.id)
        });
    } else {
      return;
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    success,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

