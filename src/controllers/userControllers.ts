import { Request, Response } from "express";
import { userService } from "../services/userServices";

export class UserController {
  constructor(private userService: userService) { }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = req.body;
      await this.userService.createUser(newUser);
      res.status(200).send("User added successfully");
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(409).send("User already exists");
      }
    }
  }
}
