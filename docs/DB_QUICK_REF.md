# Database quick reference

## References & Tutorials

- [Sequelize Docs](https://sequelize.readthedocs.io/en/v3/)
- [Introduction to ORMs](http://www.duringthedrive.com/2017/05/06/models-migrations-sequelize-node/)
- [Sequelize Tutorial on Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)
- [Project Set Up Tutorial - Node.js, Express, and Knex](https://hackernoon.com/setting-up-node-js-with-a-database-part-1-3f2461bdd77f)
- [Project Set Up Tutorial - Node.js, Express, and Postgres](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize#generating-models)

## Useful Commands

## Migrations for new models using Sequelize-CLI

- Create a migration

```
$ sequelize model:generate --name ModelName --attributes field1:string,field2:string
```

- When adding a new model, update the auto-generated migration to include default values for the `createdAt` and `updatedAt` fields:

```
createdAt: {
  allowNull: false,
  type: Sequelize.DATE,
  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
},
updatedAt: {
  allowNull: false,
  type: Sequelize.DATE,
  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
}
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
