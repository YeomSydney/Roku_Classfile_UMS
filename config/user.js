const sqlCreds = {
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'root', // Blank for Window.
    database        : 'roku_users',
    port            : 8889 // 8889 for Mac, 3306 for Window.
}

module.exports = sqlCreds;