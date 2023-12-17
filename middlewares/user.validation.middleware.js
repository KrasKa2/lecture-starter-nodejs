import { USER } from "../models/user.js";
import { StringFieldValidtor } from './validator/StringFieldValidtor.js';
import { ValidationError } from './validator/ValidationError.js';
import { FieldsValidator } from './validator/FieldsValidator.js';


const EMAIL_DOMAIN = "gmail.com";
const COUNTRY_CODE = "[+]380";

const createUserValid = (req, res, next) => {

  new FieldsValidator(USER)
    .forbidRedundantFields()
    .validate(req.body)
    .throwError(ValidationError.badRequestError);

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

const updateUserValid = (req, res, next) => {

  new FieldsValidator(USER)
    .forbidRedundantFields()
    .minCountFields(1)
    .validate(req.body)
    .throwError(ValidationError.badRequestError);

  const { firstName, lastName, email, phoneNumber, password } = req.body;

  new StringFieldValidtor("firstName")
    .validate(firstName)
    .throwError(ValidationError.badRequestError);

  new StringFieldValidtor("lastName")
    .validate(lastName)
    .throwError(ValidationError.badRequestError);
    
  new StringFieldValidtor("email")
    .email(EMAIL_DOMAIN, "XXXXXX@gmail.com")
    .validate(email)
    .throwError(ValidationError.badRequestError);

  new StringFieldValidtor("phoneNumber")
    .phone(COUNTRY_CODE, "+380XXXXXXXXX")
    .validate(phoneNumber)
    .throwError(ValidationError.badRequestError);

  new StringFieldValidtor("password")
    .minLength(3)
    .validate(password)
    .throwError(ValidationError.badRequestError);

  next();
};

export { createUserValid, updateUserValid };
