import mysql from "mysql2/promise";

export const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Dquintanilla244",
    database: "Sky_IN5CM",
    waitForConnections: true,
    connectionLimit: 10
});