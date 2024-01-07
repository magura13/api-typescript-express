interface IUser extends Document {
    userName: string;
    password: string;
    email: string;
    openToWork:boolean;
    programmingLanguages: Array<{
      language: string;
      experience: number;
    }>
    workAt:Array<string>;
  }