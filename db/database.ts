import { DB } from './types' // this is the Database interface we defined earlier
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const { DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD } = process.env;


const dialect = new PostgresDialect({
    pool: new Pool({
        database: DB_DATABASE,
        host: DB_HOST,
        password: DB_PASSWORD,
        user: DB_USER,
        port: 5432,
        max: 10,
        ssl: true
    })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<DB>({
    dialect,
})