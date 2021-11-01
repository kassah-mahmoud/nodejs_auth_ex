To run the project

1 install the deps: yarn
2 cd packages/back/src/database
3 Make sure there is mysql server instance running on 3306 port and has the same credentials as in database/config/config.json
4 create the db: cd npx sequelize-cli db:create
5 run the migrations: npx sequelize-cli db:migrate
5 go back to home dir: cd ../../../../
6 yarn start
