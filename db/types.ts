import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Article = {
    id: Generated<number>;
    authorEmail: string;
    title: string;
    description: string;
    author: string;
    classification: string;
    createdAt: string;
    updatedAt: string;
};
export type DB = {
    Article: Article;
};
