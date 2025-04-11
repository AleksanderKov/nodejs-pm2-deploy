module.exports = {
  apps: [
    {
      name: 'mesto-backend',
      script: './backend/dist/app.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'mesto-frontend',
      script: 'npx',
      args: 'serve -s build',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '84.201.176.8',
      key: './deploy/private_key',
      ref: 'origin/master',
      repo: 'git@github.com:AleksanderKov/web-plus-pm2-deploy.git',
      path: '/home/ubuntu/mesto',
      'pre-deploy-local': '',
      'post-deploy': `
        cd backend && npm install &&
        npm run build &&
        cd ../frontend && npm install && npm run build &&
        pm2 reload ecosystem.config.js --env production
      `,
      'pre-setup': ''
    }
  }
};
