/* server config */
const { server } = require('./app');
const PORT = 3001;
const {conn} = require("./DB_connection")

server.listen(PORT, () => {
   conn.sync({force: true}); //force true dropea las tablas (para modo desarrollo)
   console.log('Server raised in port: ' + PORT);
});