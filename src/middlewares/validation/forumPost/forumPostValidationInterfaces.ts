import { ValidationChain } from 'express-validator';

export interface IForumPostValidationRules {
  forumPostValidationRules: ValidationChain[];
}
