import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'mysql-blog-container',
    user: 'blog_user',
    database: 'RWBY_blog',
    password: 'Abc12Def',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool