import { validationResult, body } from 'express-validator';
import { Request, Response } from 'express';
import { ILikeValidationRules } from './likeValidationInterface';
import { likeValidationRules } from './likeValidationRules';

export class LikeValidationMiddleware {
  private _validationRules: ILikeValidationRules;

  constructor() {
    this._validationRules = likeValidationRules;
  }

  public get forumPostValidationRules() {
    return this._validationRules.likeValidationRules;
  }

  public validateRequest(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errors.array();
    }
  }
}
