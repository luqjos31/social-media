
const validatorData = require("validator")

const validator = (params) => {
  // Function code goes here
  // Code that may throw an error
  // console.log("Here Validator")
  let validatedData = false;
  let validate_title = validatorData.isEmpty(params.title) || !(validatorData.isLength(params.title, { min: 2, max: 20 }));
  let validate_content = validatorData.isEmpty(params.content)

  validatedData = (validate_title || validate_content) ? false : true

  return validatedData

}

module.exports = { validator }