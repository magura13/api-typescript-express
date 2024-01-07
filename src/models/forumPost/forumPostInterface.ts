interface IForumPost extends Document {
    userId: string;
    content:{
      title:string,
      subject:string,
      message:string,
      images:Array<string>
    }
  }