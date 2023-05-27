import { Link } from "./link";

export class Book {
  id: number;
  title: string;
  subtitle: string;
  authors: string;
  genre: string;
  description: string;
  published: number;
  pages: number;
  link: Link;
}
