# nechaev-vova-otus
homeworks

## Инструкция для запуска проекта.

### Через docker-compose
1. в корневой директории выполнить `docker-compose up`

### Через docker run
1. docker:
* `docker network create mongo`
* `docker run -d --network mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example --name mongo -p 27017:27017 mongo`
* `docker run -d --network mongo -e ME_CONFIG_MONGODB_ADMINUSERNAME=root -e ME_CONFIG_MONGODB_ADMINPASSWORD=example -e ME_CONFIG_MONGODB_SERVER=mongo -p 8081:8081 mongo-express`
2. in nuxt folder:
* `npm run dev`
3. in auth folder:
* `npm run start`

**before use app send two request!**
* ** GET http://localhost:3001/auth/users ** - create Roles
* ** POST http://localhost:3001/auth/registration with body 
`{
  "username": "user",
  "password": "password"
}`** - registration user