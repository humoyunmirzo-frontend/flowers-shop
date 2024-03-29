const Pool = require("pg").Pool

const pool = new Pool({
    user: 'postgres',
    password: 'humoyun5020',
    database: 'flower_shop',
    host: 'localhost',
    port: 5432
})

module.exports = pool