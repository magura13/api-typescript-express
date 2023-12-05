import { body, param, query } from 'express-validator';
import { IValidationRules } from './validationInterfaces';

export const validationRules: IValidationRules = {
  userValidationRules: [
    body('email').notEmpty().isEmail(),
    body('password')
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
      .isLength({ min: 6 }),
    body('userName').notEmpty(),
  ],
  signInValidationRules: [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
  ],
  userIdValidationRules: [param('userId').notEmpty()],
  changeUserValidationRules: [
    body('email').notEmpty().isEmail().optional(),
    body('password').notEmpty().optional(),
    body('userName').notEmpty().optional(),
  ],
};
