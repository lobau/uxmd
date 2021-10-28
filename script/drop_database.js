require("dotenv").config();
const initPgPool = require("../lib/pg.js");
const pool = initPgPool();

const dropTables = async () => {
	await pool.query(`DROP TABLE IF EXISTS documents;`)
	await pool.query(`DROP TABLE IF EXISTS users;`)
	await pool.query(`DROP TABLE IF EXISTS oauth_tokens;`)
};

dropTables().then(() => {
	console.log("Done.")
	process.exit(1)
});

