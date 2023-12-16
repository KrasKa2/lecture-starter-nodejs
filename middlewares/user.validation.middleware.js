import { USER } from "../models/user.js";
import { StringFieldValidtor } from './validator/StringFieldValidtor.ts'


const EMAIL_DOMAIN = "gmail.com";
const COUNTRY_CODE = "[+]380";


const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const firstNameValidator = new StringFieldValidtor("firstName")
    .required()
    .validate(firstName);

  const lastNameValidator = new StringFieldValidtor("lastName")
    .required()
    .validate(lastName);

  const emailValidator = new StringFieldValidtor("email")
    .required()
    .email(EMAIL_DOMAIN)
    .validate(email);

  const phoneNumberValidator = new StringFieldValidtor("phoneNumber")
    .required()
    .phone(COUNTRY_CODE)
    .validate(phoneNumber);

  const passwordValidator = new StringFieldValidtor("password")
    .required()
    .minLength(3)
    .validate(password);
  
  const errors = [
    firstNameValidator.getError(),
    lastNameValidator.getError(),
    emailValidator.getError(),
    phoneNumberValidator.getError(),
    passwordValidator.getError()
  ].filter(e => e);

  if (errors.length) {
    res.status(400).send(JSON.stringify({ errors }));
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const firstNameValidator = new StringFieldValidtor("firstName")
    .validate(firstName);

  const lastNameValidator = new StringFieldValidtor("lastName")
    .validate(lastName);
    
  const emailValidator = new StringFieldValidtor("email")
    .email(EMAIL_DOMAIN)
    .validate(email);

  const phoneNumberValidator = new StringFieldValidtor("phoneNumber")
    .phone(COUNTRY_CODE)
    .validate(phoneNumber);

  const passwordValidator = new StringFieldValidtor("password")
    .minLength(3)
    .validate(password);

  const errors = [
    firstNameValidator.getError(),
    lastNameValidator.getError(),
    emailValidator.getError(),
    phoneNumberValidator.getError(),
    passwordValidator.getError()
  ].filter(e => e);

  if (errors.length) {
    res.status(400).send(JSON.stringify({ errors }));
  }

  next();
};

export { createUserValid, updateUserValid };
