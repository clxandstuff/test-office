/* eslint-disable no-console */
import commander from 'commander';
import colors from 'colors/safe';
import fs from 'fs';
import path from 'path';
import HttpMockServer from '../lib/app/mockServers/http/MockServer';
import WsMockServer from '../lib/app/mockServers/ws/MockServer';
import runAdminServer from '../lib/app/adminServer';

let port = 3000;
let server;
const serverType = process.argv[2];

commander
  .option('-p, --port <n>', 'Port on which server is listening', parseInt)
  .option('-s --src <n>', 'Path of file with mocks to import')
  .parse(process.argv);

if (typeof commander.port !== 'undefined') {
  if (Number.isNaN(commander.port)) {
    throw new Error(`Invalid port: ${commander.port}`);
  }

  port = commander.port;
}

switch (serverType) {
  case 'http': {
    server = new HttpMockServer({ port });
    break;
  }
  case 'ws': {
    server = new WsMockServer({ port });
    break;
  }
  default: {
    throw new Error('Missing or uknown server type');
  }
}

server.start().then(() => {
  console.log(
    colors.green(
      `${serverType} server started on adress: http://localhost:${port}`
    )
  );

  if (commander.src) {
    fs.readFile(commander.src, (err, data) => {
      if (!data) {
        throw new Error('File not found');
      }
      try {
        JSON.parse(data).forEach(server.add.bind(server));
      } catch (e) {
        console.log(colors.red('Invalid mocks file'));
        console.log(e);
        server.stop();
      }
    });
  }

  runAdminServer(server, port + 1, error => {
    if (error) {
      console.log(error);
      server.stop();
    }
  });
}).catch(e => {
  console.log(`Error: ${e}`);
});
