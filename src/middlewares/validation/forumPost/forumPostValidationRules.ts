import { body , param} from 'express-validator';
import { IForumPostValidationRules } from './forumPostValidationInterfaces';

export const forumPostvalidationRules: IForumPostValidationRules = {
  forumPostValidationRules: [
    body('userId')
      .notEmpty()
      .withMessage('User ID is required'),
    body('userName')
    .notEmpty()
    .withMessage('User name is required'),

    body('content.title')
      .notEmpty()
      .withMessage('Title is required'),

    body('content.subject')
      .notEmpty()
      .withMessage('Subject is required'),

    body('content.message')
      .notEmpty()
      .withMessage('Message is required')
  ],
  forumPostIdValidationRules: [
    param('forumPostId')
    .notEmpty().withMessage('Forum Post Id is required'),
  ],
  forumPostChangeDataValidationRules: [
    param('forumPostId')
    .notEmpty().withMessage('User ID is required'),

  body('content.title')
    .notEmpty().optional(),

  body('content.subject')
    .notEmpty().optional(),

  body('content.message')
    .notEmpty().optional(),

  body('content.images')
    .isArray().optional(),
]
}

