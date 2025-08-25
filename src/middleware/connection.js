import pg from 'pg';
import {config} from 'dotenv';

config();

const {HOST, DATABASE, PASSWORD, USER, PORT} = process.env

export const pool = new pg.Pool({
    host:HOST,
    database:DATABASE,
    password:PASSWORD,
    user:USER,
    port:PORT
});

export default pool;


