const Server = require("./server/server");
const { initialConfig } = require("./utils/initialSetup");

const server = new Server();
initialConfig();

server.listen();
