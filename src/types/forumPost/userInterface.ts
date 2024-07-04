interface User extends Document {
  _id: string;
  userName: string;
  password: string;
  email: string;
  openToWork: boolean;
  programmingLanguages: Array<{
    language: string;
    experience: number;
  }>;
  workAt: Array<string>;
}
