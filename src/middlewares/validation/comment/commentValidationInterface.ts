import { ValidationChain } from 'express-validator';

export interface IValidationRules {
  commentValidationRules: ValidationChain[];
  commentRemovalValidationRules: ValidationChain[];
  commentChangeValidationRules: ValidationChain[];
}
