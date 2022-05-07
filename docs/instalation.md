## Depedency
- npm install --save sequelize sequelize-cli
- npm install dotenv
- npm install nodemon
- npm install 

## to generate db migration
`npx sequelize init`

## to run migrate db
- npx sequelize

run this to create migrate
- npx sequelize migration:create --name {name_file} `ex create-products-table`

run this to migrate db
- npx sequelize db:migrate