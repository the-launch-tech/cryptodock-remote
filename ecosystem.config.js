module.exports = {
  apps: [
    {
      name: 'cryptodock',
      script: 'npm',
      cwd: '/cryptodock/remote',
      args: '--name "remote" -- run prod',
      watch: true,
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'static/migrations'],
      watch_options: {
        followSymlinks: false,
      },
      instances: 4,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
