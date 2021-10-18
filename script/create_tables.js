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
		CREATE INDEX IF NOT EXISTS ON documents (route);
	`);
	pool.query(`
		CREATE TABLE IF NOT EXISTS users(
			id BIGSERIAL PRIMARY KEY,
			name VARCHAR,
			email VARCHAR
		);
	`);
	pool.query(`
		CREATE INDEX IF NOT EXISTS ON users (email);
	`);
	pool.query(`
		CREATE TABLE IF NOT EXISTS oauth_tokens(
			id BIGSERIAL PRIMARY KEY,
			user_id bigint,
			oauth_user_id VARCHAR,
			oauth_provider VARCHAR,
			access_token VARCHAR,
			refresh_token VARCHAR,
		);
	`);
	pool.query(`
		CREATE INDEX IF NOT EXISTS ON oauth_tokens (user_id);
	`);
	pool.query(`
		CREATE INDEX IF NOT EXISTS ON oauth_tokens (oauth_user_id);
	`);
	pool.query(`
		CREATE INDEX IF NOT EXISTS ON oauth_tokens (oauth_provider);
	`);
	pool.query(`
		CREATE INDEX IF NOT EXISTS ON oauth_tokens (email);
	`);
};

createTables();
console.log("Done.")
process.exit(1)
