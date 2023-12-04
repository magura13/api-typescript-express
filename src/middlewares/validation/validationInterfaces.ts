import { ValidationChain } from 'express-validator';

export interface IValidationRules {
  userValidationRules: ValidationChain[];
  signInValidationRules: ValidationChain[];
}