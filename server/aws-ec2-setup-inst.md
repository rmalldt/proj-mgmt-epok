# EC2 Setup Instructions

## 1. Connect to EC2 instance via EC2 instance Connect

## 2. Install Node Version Manager (nvm) and Node.js

- **Switch to superuser and install nvm:**

```
sudo su -

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

- **Activate nvm:**

```
. ~/.nvm/nvm.sh
```

- **Install the latest version of Node.js using nvm:**

```
nvm install node
```

- **Verifiy Node.js and npm are installed**

```
node -v
npm -v
```

## 3. Install Git

- **Update the system and install Git:**

```
sudo yum update -y

sudo yum install git -y
```

- **Check Git version:**

```
git --version
```

- **Clone your code repository from GitHub:**

```
git clone [github-repo-link]
```

- **Navigate to the directory and install packages:**

```
cd [repo]

cd server

npm i
```

- **Create .env file and Port 80:**

```
echo "PORT=80" > .env
```

- **Start the application:**

```
npm run dev
```

## 4. Install [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) (Producuction Process Manager for Node.js)

- **Install pm2 globally**

```
npm i pm2 -g
```

- **Create a pm2 ecosystem co pm2 globally**

```
module.exports = {
  apps: [
    {
      name: 'project-management',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
```

- **Set a pm2 to restart automatically on system reboot:**

```
sudo env PATH=$PATH:$(which node) $(which pm2) startup systemd -u $USER –hp $(eval echo ~$USER)
```

- **Start the server using pm2 ecosystem configuration:**

```
pm2 start ecosystem.config.js
```

**Useful pm2 commands:**

- **Monitor all processes:**

```
pm2 monit
```

- **Stop all processes:**

```
pm2 stop all
```

- **Delete all processes:**

```
pm2 delete all
```
