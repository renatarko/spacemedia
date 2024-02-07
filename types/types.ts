import { DocumentData } from "firebase/firestore";

export type User = {
  name: string;
  email: string;
  avatar?: string;
  linkName: string;
  background: {
    color?: string;
    type?: string;
    direction?: string;
    gradient?: {
      firstColor?: string;
      secondColor?: string;
    };
  };
  title: {
    content: string;
    color?: string;
    size?: string;
    weight?: string;
  };
  nickname: {
    content: string;
    color?: string;
    size?: string;
    weight?: string;
  };
  career: {
    content: string;
    color?: string;
    size?: string;
    weight?: string;
  };
  link: {
    background?: string;
    color?: string;
    size?: string;
    weight?: string;
    links?: Link[];
  };
  // links: Link[];
};

export type UserContext = Pick<User, "name" | "email" | "avatar">;

// export type Link = {
//   name?: string;
//   url?: string;
//   type?: string;
//   background?: string;
//   color?: string;
// };

export type Link = {
  // link: {
  type?: string;
  name?: string;
  url?: string;
  background?: string;
  color?: string;
  weight?: string;
  size?: string;
  icon?: string;
  // };
};

export type Links = Link[];

export interface UserDocument extends DocumentData {
  user: User | undefined;
}

export interface LinkDocument {
  links: Link[];
}
