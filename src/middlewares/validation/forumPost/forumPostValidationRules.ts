import { body} from 'express-validator';
import { IForumPostValidationRules } from './forumPostValidationInterfaces';

export const forumPostvalidationRules: IForumPostValidationRules = {
  forumPostValidationRules: [
    body('userId')
    .notEmpty()
    .withMessage('User ID is required'),

  body('content.title')
    .notEmpty()
    .withMessage('Title is required'),

  body('content.subject')
    .notEmpty()
    .withMessage('Subject is required'),

  body('content.message')
    .notEmpty()
    .withMessage('Message is required')
  ]
}
