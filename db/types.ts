import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Article = {
    id: Generated<number>;
    email: string | null;
    title: string;
    description: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type MetaData = {
    id: Generated<number>;
    author: string;
    classfication: string;
    articleid: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DB = {
    Article: Article;
    MetaData: MetaData;
};
