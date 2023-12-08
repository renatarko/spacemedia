export type User = {
  name: string;
  email: string;
  avatar: string | null;
  career?: string | undefined;
};

export type Link = {
  name?: string;
  url?: string;
  type?: string;
  background?: string;
  color?: string;
};

export type Links = Link[];
