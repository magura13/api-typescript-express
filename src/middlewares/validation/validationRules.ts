import { body, ValidationChain } from 'express-validator';
import {IValidationRules} from './validationInterfaces'

export const validationRules: IValidationRules = {
  userValidationRules: [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
    body('userName').notEmpty()
  ],
  signInValidationRules: [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty()
  ]
};