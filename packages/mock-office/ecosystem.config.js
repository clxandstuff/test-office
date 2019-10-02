module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // App server only
    {
      name: 'http',
      script: './dist/bin/mock-office.js',
      args:
        'http -p 8123 -s /Users/bartoszadamczyk/Projects/aktualne/mock-office/examples/http-server/pm2.json',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'development'
      },
      watch: ['./dist', './examples/http-server/pm2.json'],
      out_file: __dirname + '/pm2.log',
      error_file: __dirname + '/pm2.log',
      combine_logs: true
    },
    {
      name: 'ws',
      script: './dist/bin/mock-office.js',
      args:
        'ws -p 8234 -s /Users/bartoszadamczyk/Projects/aktualne/mock-office/examples/ws-server/pm2.json',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'development'
      },
      watch: ['./dist', './examples/ws-server/pm2.json'],
      out_file: __dirname + '/pm2.log',
      error_file: __dirname + '/pm2.log',
      combine_logs: true
    }
    // with GUI
    // {
    //   name: 'gui',
    //   script: './dist/bin/mock-office.js',
    //   args: '--gui',
    //   env: {
    //     COMMON_VARIABLE: 'true'
    //   },
    //   env_production: {
    //     NODE_ENV: 'production'
    //   },
    //   watch: [
    //     './dist/lib/app',
    //     './dist/index.js'
    //   ],
    //   out_file: __dirname + '/pm2.log',
    //   error_file: __dirname + '/pm2.log',
    //   args: "--gui",
    //   combine_logs: true
    // }
  ]
};
