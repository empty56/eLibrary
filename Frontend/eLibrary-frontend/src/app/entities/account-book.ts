import { Account } from "./account";
import { Book } from "./book";

export class AccountBook {
    id: number;
    book: Book;
    account: Account;
    bought: boolean;
    favourite: boolean;
    wanted: boolean;
    reading: boolean;
    already_read: boolean;
    currentPage: number;
}
