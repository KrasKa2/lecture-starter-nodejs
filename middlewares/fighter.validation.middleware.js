import { FIGHTER } from "../models/fighter.js";
import { StringFieldValidtor } from './validator/StringFieldValidtor.js';
import { ValidationError } from './validator/ValidationError.js';
import { NumberFieldValidtor } from './validator/NumberFieldValidtor.js';
import { FieldsValidator } from './validator/FieldsValidator.js';


const createFighterValid = (req, res, next) => {
  
  new FieldsValidator(FIGHTER)
    .forbidRedundantFields()
    .validate(req.body)
    .throwError(ValidationError.badRequestError);

  const { name, health, power, defense } = req.body;

  new StringFieldValidtor("name")
    .required()
    .validate(name)
    .throwError(ValidationError.badRequestError);

  new NumberFieldValidtor("health")
    .moreOrEqual(80)
    .lessOrEqual(120)
    .validate(health)
    .throwError(ValidationError.badRequestError);

  new NumberFieldValidtor("power")
    .required()
    .moreOrEqual(1)
    .lessOrEqual(100)
    .validate(power)
    .throwError(ValidationError.badRequestError);

  new NumberFieldValidtor("defense")
    .required()
    .moreOrEqual(1)
    .lessOrEqual(10)
    .validate(defense)
    .throwError(ValidationError.badRequestError);

  next();
};


const updateFighterValid = (req, res, next) => {
  
  new FieldsValidator(FIGHTER)
    .forbidRedundantFields()
    .minCountFields(1)
    .validate(req.body)
    .throwError(ValidationError.badRequestError);

  const { name, health, power, defense } = req.body;

  new StringFieldValidtor("name")
    .validate(name)
    .throwError(ValidationError.badRequestError);

  new NumberFieldValidtor("health")
    .moreOrEqual(80)
    .lessOrEqual(120)
    .validate(health)
    .throwError(ValidationError.badRequestError);

  new NumberFieldValidtor("power")
    .moreOrEqual(1)
    .lessOrEqual(100)
    .validate(power)
    .throwError(ValidationError.badRequestError);

  new NumberFieldValidtor("defense")
    .moreOrEqual(1)
    .lessOrEqual(10)
    .validate(defense)
    .throwError(ValidationError.badRequestError);

  next();
};

export { createFighterValid, updateFighterValid };
