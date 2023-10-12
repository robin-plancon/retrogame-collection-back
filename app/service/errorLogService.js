const bunyan = require('bunyan');

const log = bunyan.createLogger({
    name: 'Retr0game Collection',
    streams: [
      {
        type: 'file',
        path: './app/service/app.log', // Name of the log file
      },
    ],
  });

  module.exports = log;