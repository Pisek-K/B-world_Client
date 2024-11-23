import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email is required",
  }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must contain a-z A-Z 0-9 and must be at least 6 characters.",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Confirm Password is required.",
    "any.only": "Password and Confirm password is not match.",
  }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, {
    abortEarly: false,
  });
  // console.log(error.details)
  if (error) {
    const formatError = error.details.reduce((prev, curr) => {
        // console.log(curr.path[0])
        // console.log(curr.message)
        prev[curr.path[0]] = curr.message
      return prev;
    }, {});
    return formatError;
  }
  return null
};

export default validateRegister;
