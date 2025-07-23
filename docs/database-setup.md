````markdown
<!--
Path: docs/database-setup.md
Description: Detailed instructions for setting up the CMS databases (MySQL & MongoDB) via Docker, Ubuntu VPS, and Windows local.
Created: 2025-07-23T16:30:00+05:30
Updated: 2025-07-23T16:30:00+05:30
-->

# Database Setup

## Docker (MySQL 8.4 & MongoDB 8.0)

1. Ensure Docker Desktop is installed and running.
2. From the project root (same level as `package.json`), run:
   ```bash
   docker compose up -d
   ```
````

3. Verify containers:

   ```bash
   docker compose ps
   ```

4. (Optional) View logs:

   ```bash
   docker compose logs -f mysql
   docker compose logs -f mongodb
   ```

5. To stop & remove:

   ```bash
   docker compose down
   ```

---

## Ubuntu VPS Manual Install

### MySQL 8.4

```bash
sudo apt update
wget https://dev.mysql.com/get/mysql-apt-config_0.8.32-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.32-1_all.deb
sudo apt update
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

### MongoDB 8.0

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc \
  | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] \
  https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" \
  | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## Windows Local Manual Install

### MySQL 8.4 (via WAMP)

- Download the MySQL 8.4 MSI from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
- Run the installer ► select **Server-only** ► set root password to `root` ► add MySQL to your **User** `PATH`.

### MongoDB 8.0

- Download the MongoDB Community Edition 8.0 MSI from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Run the installer as a Windows **Service** ► add
  `C:\Program Files\MongoDB\Server\8.0\bin`
  to your **User** `PATH` via **System Properties > Environment Variables**.

---

## Environment Variables

At the project root, copy and edit:

```bash
cp .env.example .env
```

Ensure these values match your installations:

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=       # blank if no password
DB_NAME=cms_dev
TEST_DB_NAME=cms_test

MONGO_URL=mongodb://localhost:27017/cms
```

---

## Verify Connections

1. Install test dependencies (once):

   ```bash
   npm install mysql2 mongodb dotenv --save-dev
   ```

2. Run the connection test:

   ```bash
   node tests/db-connect-test.js
   ```

3. Run automated Jest test:

   ```bash
   npm test
   ```

---

## Troubleshooting

- **Firewall**: Ensure ports `3306` (MySQL) and `27017` (MongoDB) are open.
- **Service Status**:

  - Ubuntu: `systemctl status mysql`, `systemctl status mongod`
  - Windows: check **Services** for `MySQL` and `MongoDB` and ensure they’re **Running**.

- **PATH issues (Windows)**:
  If `docker` or `mongo` isn’t recognized, ensure the bin folders are in your **User** `PATH`, then restart your terminal.

```

```
