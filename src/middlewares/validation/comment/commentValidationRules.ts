import { body, param} from 'express-validator';
import { IValidationRules } from './commentValidationInterface';

export const commentValidationRules: IValidationRules = {
  commentValidationRules: [
    param('forumPostId')
      .notEmpty().withMessage('postId is required'),

    body('userId')
      .notEmpty().withMessage('UserId is required'),

    body('message')
      .notEmpty().withMessage('Message field is required'),
  ]
};
