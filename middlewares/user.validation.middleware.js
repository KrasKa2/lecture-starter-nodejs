import { USER } from "../models/user.js";
import { StringFieldValidtor } from './validator/StringFieldValidtor.ts';
import { ValidationError } from './validator/ValidationError.ts';


const EMAIL_DOMAIN = "gmail.com";
const COUNTRY_CODE = "[+]380";


const checkRedundantFields = (data) => {
  const userFields = Object.keys(USER).filter(field => field != 'id');
  const redundantFields = Object.keys(data)
    .filter(field => !userFields.includes(field));
  if (redundantFields.length) {
    throw ValidationError.badRequestError(`Redundant fields: ${redundantFields.join(", ")}`);
  } 
}

const createUserValid = (req, res, next) => {

  checkRedundantFields(req.body);

  const { firstName, lastName, email, phoneNumber, password } = req.body;

  new StringFieldValidtor("firstName")
    .required()
    .validate(firstName)
    .throwError(ValidationError.badRequestError);

  new StringFieldValidtor("lastName")
    .required()
    .validate(lastName)
    .throwError(ValidationError.badRequestError);

  new StringFieldValidtor("email")
    .required()
    .email(EMAIL_DOMAIN, "XXXXXX@gmail.com")
    .validate(email)
    .throwError(ValidationError.badRequestError);

  new StringFieldValidtor("phoneNumber")
    .required()
    .phone(COUNTRY_CODE, "+380XXXXXXXXX")
    .validate(phoneNumber)
    .throwError(ValidationError.badRequestError);

  new StringFieldValidtor("password")
    .required()
    .minLength(3)
    .validate(password)
    .throwError(ValidationError.badRequestError);

  next();
};

const checkCountFields = (data) => {
  if (!Object.keys(data).length) {
    throw ValidationError.badRequestError("Must be at least one field for updating!");
  }
}

const updateUserValid = (req, res, next) => {

  checkRedundantFields(req.body);
  checkCountFields(req.body);

  const { firstName, lastName, email, phoneNumber, password } = req.body;

  new StringFieldValidtor("firstName")
    .validate(firstName)
    .throwError(ValidationError.badRequestError);

  new StringFieldValidtor("lastName")
    .validate(lastName)
    .throwError(ValidationError.badRequestError);
    
  new StringFieldValidtor("email")
    .email(EMAIL_DOMAIN)
    .validate(email)
    .throwError(ValidationError.badRequestError);

  new StringFieldValidtor("phoneNumber")
    .phone(COUNTRY_CODE)
    .validate(phoneNumber)
    .throwError(ValidationError.badRequestError);

  new StringFieldValidtor("password")
    .minLength(3)
    .validate(password)
    .throwError(ValidationError.badRequestError);

  next();
};

export { createUserValid, updateUserValid };
