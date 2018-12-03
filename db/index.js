// Get the node environment, otherwise it's development
const env = process.env.NODE_ENV || "development";

// Get the config object based on env, and load knex with it.
const config = require("../knexfile")[env];
const connection = require("knex")(config);

module.exports = connection;
