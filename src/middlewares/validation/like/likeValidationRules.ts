import { body, param } from 'express-validator';
import { ILikeValidationRules } from './likeValidationInterface';

export const likeValidationRules: ILikeValidationRules = {
  likeValidationRules: [
    param('forumPostId').notEmpty().withMessage('postId is required'),

    param('userId').notEmpty().withMessage('commentId is required'),
  ],
};
