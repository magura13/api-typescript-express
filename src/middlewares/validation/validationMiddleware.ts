import { validationResult, body } from 'express-validator';
import { Request,Response } from 'express';
import { IValidationRules } from './validationInterfaces';
import { validationRules } from './validationRules';

export class ValidationMiddleware {
  private _validationRules : IValidationRules;

  constructor() {
    this._validationRules = validationRules;
  }


  public get getSignInValidationRules() {
    return this._validationRules.signInValidationRules
  }

  public get getValidationRules() {
    return this._validationRules.userValidationRules
  }

  public validateRequest(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errors.array();
    }
}
}