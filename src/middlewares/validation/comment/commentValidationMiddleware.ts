import { validationResult, body } from 'express-validator';
import { Request, Response } from 'express';
import { IValidationRules } from './commentValidationInterface';
import { commentValidationRules } from './commentValidationRules';

export class CommentValidationMiddleware {
  private _validationRules: IValidationRules;

  constructor() {
    this._validationRules = commentValidationRules;
  }

  public get getCommentValidationRules() {
    return this._validationRules.commentValidationRules;
  }

  public get getCommentRemovalValidationRules () {
    return this._validationRules.commentRemovalValidationRules;
  }

  public get getCommentChangeValidationRules () {
    return this._validationRules.commentChangeValidationRules;
  }

  public validateRequest(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errors.array();
    }
  }
}
