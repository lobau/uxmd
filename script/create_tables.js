require("dotenv").config();
const initPgPool = require("../lib/pg.js");
const pool = initPgPool();

const createTables = async () => {
	await pool.query(`
		CREATE TABLE IF NOT EXISTS documents(
			id BIGSERIAL PRIMARY KEY,
			route VARCHAR,
			title VARCHAR,
			body VARCHAR
		);
	`)
	await pool.query(`
		CREATE INDEX ON documents (route);
	`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS users(
			id BIGSERIAL PRIMARY KEY,
			name VARCHAR,
			email VARCHAR
		);
	`);
	await pool.query(`
		CREATE INDEX ON users (email);
	`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS sessions(
			id BIGSERIAL PRIMARY KEY,
			user_id BIGINT,
			secret VARCHAR
		);
	`);
	await pool.query(`
		CREATE INDEX ON sessions (user_id);
	`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS oauth_tokens(
			id BIGSERIAL PRIMARY KEY,
			user_id bigint,
			oauth_provider VARCHAR,
			access_token VARCHAR,
			refresh_token VARCHAR
		);
	`);
	await pool.query(`
		CREATE INDEX ON oauth_tokens (user_id);
	`);
	await pool.query(`
		CREATE INDEX ON oauth_tokens (oauth_provider);
	`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS oauth_ids_to_user_ids(
			user_id bigint,
			oauth_id VARCHAR,
			service VARCHAR,
			PRIMARY KEY (user_id, oauth_id, service)
		);
	`);
};

createTables().then(() => {
	console.log("Done.")
	process.exit(1)
});
