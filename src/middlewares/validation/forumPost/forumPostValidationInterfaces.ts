import { ValidationChain } from 'express-validator';

export interface IForumPostValidationRules {
  forumPostValidationRules: ValidationChain[];
  forumPostIdValidationRules: ValidationChain[];
  forumPostChangeDataValidationRules: ValidationChain[];
}
