import { Account } from "./account";
import { Book } from "./book";

export class Review {
    id: number;
    review: string;
    rating: number;
    account : Account;
    book : Book;
}