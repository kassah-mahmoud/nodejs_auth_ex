To run the project

- install the deps: yarn   
- cd packages/back/src/database   
- Make sure there is mysql server instance running on 3306 port and has the same credentials as in database/config/config.json   
- create the db: cd npx sequelize-cli db:create   
- run the migrations: npx sequelize-cli db:migrate   
- go back to home dir: cd ../../../../  
- yarn start  
![node_auth_ex](https://user-images.githubusercontent.com/75623572/142987946-a6d4e746-fc1c-4a78-a4f4-247e928ce7ed.gif)
