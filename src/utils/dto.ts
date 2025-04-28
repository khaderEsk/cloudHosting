export interface CreateArticleDto {
  title: string;
  description: string;
}

export interface UpdateArticleDto {
  title?: string;
  description?: string;
}

export interface RegisterUserDto {
  firstName: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}


export interface UpdateUserDto {
  firstName?: string
  email?: string;
  password?: string;
}


export interface CreateCommentDto {
  text:string,
  articleId:number
}

export interface UpdateCommentDto {
  text?:string,
}

