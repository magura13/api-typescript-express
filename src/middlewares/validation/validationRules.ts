import { body, param, query } from 'express-validator';
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
  ],
  userIdValidationRules: [
    param('userId').notEmpty()
  ],
  changeUserValidationRules: [
    body('email').notEmpty().isEmail().optional(),
    body('password').notEmpty().optional(),
    body('userName').notEmpty().optional()
  ]
};