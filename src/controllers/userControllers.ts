import { Request, Response } from 'express';
import { userService } from '../services/userServices';
import { body, validationResult } from 'express-validator';

export class UserController {
  private userValidationRules = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
    body('userName').notEmpty()
  ];

  constructor(private userService: userService) {}

  public async createUser(req: Request, res: Response): Promise<any> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newUser = req.body;
      await this.userService.createUser(newUser);
      res.status(200).send('User added successfully');
    } catch (error: any) {
      if (error.code === 11000) {
      return  res.status(409).send('User/Email already exists');
      }
    }
  }

  public getValidationRules() {
    return this.userValidationRules;
  }
}
