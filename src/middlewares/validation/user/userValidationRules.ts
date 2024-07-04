import { body, param, query } from 'express-validator';
import { IValidationRules } from './userValidationInterfaces';

export const userValidationRules: IValidationRules = {
  userValidationRules: [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
      .withMessage(
        'Password must contain at least one number, one uppercase and one lowercase letter, and be 6-20 characters long'
      )
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),

    body('userName').notEmpty().withMessage('Username is required'),
  ],

  signInValidationRules: [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),

    body('password').notEmpty().withMessage('Password is required'),
  ],

  userIdValidationRules: [
    param('userId').notEmpty().withMessage('User ID is required'),
  ],

  changeUserValidationRules: [
    param('userId').notEmpty().withMessage('User ID is required'),
    body('email').notEmpty().optional().isEmail().optional(),

    body('password')
      .notEmpty()
      .optional()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
      .optional()
      .isLength({ min: 6 })
      .optional(),

    body('userName').notEmpty().optional(),
  ],
};
