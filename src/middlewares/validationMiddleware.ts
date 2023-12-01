import { validationResult, body } from 'express-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Middleware {
  private _validationRules = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
    body('userName').notEmpty()
  ]

  private _signInValidationRules = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty()
  ]

  public get getSignInValidationRules() {
    return this._signInValidationRules
  }

  public get getValidationRules() {
    return this._validationRules
  }

  public validateRequest(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errors.array();
    }
  }

  public async ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: { default: "Não autenticado" }
      })
    }

    const [type, token] = authorization.split(' ');

    if (type!=='Bearer') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: { default: "Não autenticado" }
      })
    }
    
    if (token!=='teste.teste.teste') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: { default: "Não autenticado" }
      })
    }

    return next();
  }

}