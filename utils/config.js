require("dotenv").config();

const configEnv = {
  srvPort: process.env.PORT,

  mongoLocal: process.env.MONGODBLOCAL,

  privateKey: process.env.PRIVATEKEY,
};

module.exports = { configEnv };
