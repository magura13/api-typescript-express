import { body, param} from 'express-validator';
import { IValidationRules } from './commentValidationInterface';

export const commentValidationRules: IValidationRules = {
  commentValidationRules: [
    param('forumPostId')
      .notEmpty().withMessage('postId is required'),

    body('userId')
      .notEmpty().withMessage('userId is required'),

    body('message')
      .notEmpty().withMessage('Message field is required'),
  ],
  commentRemovalValidationRules: [
    param('forumPostId')
      .notEmpty().withMessage('postId is required'),

    body('commentId')
      .notEmpty().withMessage('commentId is required'),
  ],
  commentChangeValidationRules:[
    param('forumPostId')
      .notEmpty().withMessage('postId is required'),

    body('commentId')
      .notEmpty().withMessage('commentId is required'),
  ],
};
