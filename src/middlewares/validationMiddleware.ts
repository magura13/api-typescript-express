import { validationResult , body} from 'express-validator';
import { Request, Response } from 'express';

export class Middleware {
  private _validationRules = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
    body('userName').notEmpty()
  ]

    public get getValidationRules () {
      return this._validationRules
    }

    public validateRequest(req: Request, res: Response) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errors.array();
      }
    }
  }