import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

export const useFeed = (initialForm) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [auth, setAuth] = useState({});
  const [counters, setCounters] = useState({});

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

  const loginAuth = (userId, token) => {
    // setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      helpHttp()
        .get(`http://localhost:5501/api/user/profile/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.status === "success") {
            // console.log(res)
          }
          setAuth(res.userData)
          setLoading(false);
          setResponse(true);
          setTimeout(() => setResponse(false), 5000);
        });
    } else {
      return;
    }
  };


  const dataCounters = (userId, token) => {
    // setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      helpHttp()
        .get(`http://localhost:5501/api/user/counters/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.status === "success") {
            // console.log(res)
          }
          setCounters(res)
          setLoading(false);
          setResponse(true);
          setTimeout(() => setResponse(false), 5000);
        });
    } else {
      return;
    }
  }

  return {
    errors,
    loading,
    response,
    loginAuth,
    auth,
    setAuth,
    dataCounters,
    counters,
    setCounters
  };
};

