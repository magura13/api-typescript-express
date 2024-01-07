import { validationResult, body } from 'express-validator';
import { Request, Response } from 'express';
import { IForumPostValidationRules } from './forumPostValidationInterfaces';
import { forumPostvalidationRules } from './forumPostValidationRules';

export class ForumPostValidationMiddleware {
  private _validationRules: IForumPostValidationRules;

  constructor() {
    this._validationRules = forumPostvalidationRules;
  }

  public get forumPostValidationRules() {
    return this._validationRules.forumPostValidationRules
  }

  public validateRequest(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errors.array();
    }
  }
}
