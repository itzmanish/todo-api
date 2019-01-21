module.exports = {
  apps: [
    {
      name: 'Todo app',
      script: './app.js',
      instances: 0,
      exec_mode: 'cluster',
      watch: true,
      env: {
        NODE_ENV: 'production',
        PORT: '3000'
      }
    }
  ]
};
