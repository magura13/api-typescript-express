import { validationResult, body } from 'express-validator';
import { Request, Response } from 'express';
import { IValidationRules } from './userValidationInterfaces';
import { userValidationRules } from './userValidationRules';

export class UserValidationMiddleware {
  private _validationRules: IValidationRules;

  constructor() {
    this._validationRules = userValidationRules;
  }

  public get getSignInValidationRules() {
    return this._validationRules.signInValidationRules;
  }

  public get getChangeUserValidationRules() {
    return this._validationRules.changeUserValidationRules;
  }

  public get getValidationRules() {
    return this._validationRules.userValidationRules;
  }

  public get getUserIdValidationRules() {
    return this._validationRules.userIdValidationRules;
  }

  public validateRequest(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errors.array();
    }
  }
}
