export type User = {
  name: string;
  email: string;
  avatar: string | null;
  career?: string | undefined;
  links: Link[];
};

export type Link = {
  name?: string;
  url?: string;
  type?: string;
  background?: string;
  color?: string;
};

export type Links = Link[];

export interface UserDocument {
  user: User;
}

export interface LinkDocument {
  links: Link[];
}
