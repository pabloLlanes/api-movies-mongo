const Server = require("./server/server");
const { createRoles } = require("./server/initialSetup");

const server = new Server();
createRoles();

server.listen();
