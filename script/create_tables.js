require("dotenv").config();
const initPgPool = require("../lib/pg.js");
const pool = initPgPool();

const createTables = () => {
	pool.query(`
		CREATE TABLE IF NOT EXISTS documents(
			id BIGSERIAL PRIMARY KEY,
			route VARCHAR,
			title VARCHAR,
			body VARCHAR
		);
	`)
	pool.query(`
		CREATE TABLE IF NOT EXISTS users(
			id BIGSERIAL PRIMARY KEY,
			name VARCHAR,
			email VARCHAR
		);
	`);
	pool.query(`
		CREATE TABLE IF NOT EXISTS oauth_tokens(
			id BIGSERIAL PRIMARY KEY,
			user_id bigint,
			email VARCHAR,
			access_token VARCHAR,
			refresh_token VARCHAR,
		);
	`);
};

createTables();
console.log("Done.")
process.exit(1)
