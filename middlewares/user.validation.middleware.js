import { USER } from "../models/user.js";
import { StringFieldValidtor } from './validator/StringFieldValidtor.ts';
import { ValidationError } from './validator/ValidationError.ts';


const EMAIL_DOMAIN = "gmail.com";
const COUNTRY_CODE = "[+]380";

const createError = (messge) => {
  return new ValidationError(messge);
};

const checkRedundantFields = (data) => {
  const userFields = Object.keys(USER);
  const redundantFields = Object.keys(data)
    .filter(field => !userFields.includes(field));
  if (redundantFields.length) {
    throw createError(`Redundant fields: ${redundantFields.join(", ")}`);
  } 
}

const createUserValid = (req, res, next) => {

  checkRedundantFields(req.body);

  const { firstName, lastName, email, phoneNumber, password } = req.body;

  new StringFieldValidtor("firstName")
    .required()
    .validate(firstName)
    .throwError(createError);

  new StringFieldValidtor("lastName")
    .required()
    .validate(lastName)
    .throwError(createError);

  new StringFieldValidtor("email")
    .required()
    .email(EMAIL_DOMAIN)
    .validate(email)
    .throwError(createError);

  new StringFieldValidtor("phoneNumber")
    .required()
    .phone(COUNTRY_CODE)
    .validate(phoneNumber)
    .throwError(createError);

  new StringFieldValidtor("password")
    .required()
    .minLength(3)
    .validate(password)
    .throwError(createError);

  next();
};

const checkCountFields = (data) => {
  if (!Object.keys(data).length) {
    throw createError("Must be at least one field for updating!");
  }
}

const updateUserValid = (req, res, next) => {

  checkRedundantFields(req.body);
  checkCountFields(req.body);

  const { firstName, lastName, email, phoneNumber, password } = req.body;

  new StringFieldValidtor("firstName")
    .validate(firstName)
    .throwError(createError);

  new StringFieldValidtor("lastName")
    .validate(lastName)
    .throwError(createError);
    
  new StringFieldValidtor("email")
    .email(EMAIL_DOMAIN)
    .validate(email)
    .throwError(createError);

  new StringFieldValidtor("phoneNumber")
    .phone(COUNTRY_CODE)
    .validate(phoneNumber)
    .throwError(createError);

  new StringFieldValidtor("password")
    .minLength(3)
    .validate(password)
    .throwError(createError);

  next();
};

export { createUserValid, updateUserValid };
