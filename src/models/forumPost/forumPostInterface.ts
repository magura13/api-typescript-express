interface IForumPost extends Document {
    userId: string;
    likes:Array<string>
    content:{
      title:string
      subject:string
      message:string
      images:Array<string>
      comments:Array<IComment>
      
    }
  }