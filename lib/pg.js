const { Pool } = require("pg");

const init = () => {
	const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

	const isHeroku = process.env.UXMD_ENV === "production";
	const config = {
		connectionString: isHeroku ? process.env.DATABASE_URL : connectionString,
	}
	if(isHeroku) {
		config.ssl = {
	      rejectUnauthorized: false
	  }
	}
	return new Pool(config);
}

module.exports = init

