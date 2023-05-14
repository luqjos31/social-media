export const getImage = async (imageName) => {
  // setErrors(validateForm(form));
  // router.get("/image/:imagefile?", ArticleController.image)

  if (Object.keys(errors).length === 0) {
    setLoading(true);
    helpHttp()
      .get(`http://localhost:5500/api/image/${imageName}`, null, true)
      .then((res) => {
        console.log(res)
        setLoading(false);
        setResponse(true);
        setTimeout(() => setResponse(false), 5000);
      });
    // 

  } else {
    return;
  }
}
