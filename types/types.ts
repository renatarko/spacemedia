export type User = {
  name: string;
  email: string;
  avatar?: string;
  linkName: {
    content: string;
    color?: string;
  };
  title: {
    content: string;
    color?: string;
  };
  nickname: {
    content: string;
    color?: string;
  };
  career: {
    content: string;
    color?: string;
  };
  link: {
    background?: string;
    color?: string;
    links: Link[];
  };
  // links: Link[];
};

export type UserContext = Pick<User, "name" | "email" | "avatar">;

export type Link = {
  name?: string;
  url?: string;
  type?: string;
  // background?: string;
  // color?: string;
};

export type Links = Link[];

export interface UserDocument {
  user: User;
}

export interface LinkDocument {
  links: Link[];
}
