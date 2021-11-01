To run the project

- install the deps: yarn   
- cd packages/back/src/database   
- Make sure there is mysql server instance running on 3306 port and has the same credentials as in database/config/config.json   
- create the db: cd npx sequelize-cli db:create   
- run the migrations: npx sequelize-cli db:migrate   
- go back to home dir: cd ../../../../  
- yarn start  
