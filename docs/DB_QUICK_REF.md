# Database commands quick reference

- [Sequelize Reference](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

## Migrations for new models using Sequelize-CLI

- Create a migration

```
$ sequelize model:generate --name ModelName --attributes field1:string,field2:string
```

- Run a migration

```
$ sequelize db:migrate
```

- Undo most recent migration

```
$ sequelize db:migrate:undo
```

- Undo to a specific migration

```
$ node_modules/.bin/sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-migration-name.js
```

## Seeds with Sequelize-CLI

- Generate a seed file

```
$ sequelize seed:generate --name demo-model-name
```

- Run a seed file

```
$ sequelize db:seed:all
```

- Undo the most recent seed

```
$ sequelize db:seed:undo
```

- Undo all seeds

```
$ sequelize db:seed:undo:all
```
