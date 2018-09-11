Prereqs
-------

- Homebrew
- [Node 8.9.0](https://nodejs.org/en/blog/release/v8.9.0/)
- NPM: `$ brew install -g npm`
- Yarn: `$ npm install yarn`


Install
-------

```
$ nvm use
$ yarn
```

Database set up (local)
---------------

- Install MySQL

```
$ brew update
$ brew install mysql
```

- Start MySQL and set a password

```
$ brew services start mysql
$ mysqladmin -u root password 'password'
```

Note that if running mysql for the first time from Homebrew, you may need to run `mysql_secure_installation` and follow the secure installation process to progress.


- If you get an error message like this:

```
$ mysqladmin: unable to change password; error: 'Column count of mysql.user is wrong. Expected 45, found 43. Created with MySQL 50622, now running 50718. Please use mysql_upgrade to fix this error.'
```

- Upgrade mysql:

```
$ mysql_upgrade --force -uroot # if you have a password, add -p <yourpassword>
```

- Then rerun password command.
- Download [SequelPro](https://www.sequelpro.com/) and connect:

```
Name: Journey Planner Local
Host: 127.0.0.1
Username: root
Password: password
Database: Leave blank
Port: Leave blank
```

- In SequelPro, test the connection, save as a favorite if successful, and then connect.
- Click Database > Add Database.

```
Name: `journey_planner_dev`
Database Encoding: utf8
Database Collation: utf8_general_ci
```

- Update config/config.json file with new databases

Travis CI Set Up
----------------

- Follow [instructions for encrypting files](https://docs.travis-ci.com/user/encrypting-files/) in Travis CI docs to add config/config.json to Travis. Use the `--pro` flag when encrypting a file.
