module.exports = { plugins: [new (require('dotenv-webpack'))()] }

// How this works

/* 
1. > npm i @types/node -D
2. in tsconfig.app.json in the types[] add "node"
3. > npm i @angular-bulders/custom-webpack -D
4. in angular.json 
    a. in "build" change "builder" to "@angular-builders/custom-webpack:browser" - overrides angular devkit and allows more configuration
    b. in "build: "options"" add config path "customWebpackConfig": {"path": "src/custom-webpack.config.ts"}
    c. in "serve" change "builder" to "@angular-builders/custom-webpack:dev-server"
5. create .env file in root directory and add env variables there
6. in environment.ts file add env variables using the respective keys from .env and process.env['KEY'] as variables
7. > npm i dotenv-webpack -D
8. to make it all work - create custom-webpack.config.ts in the directory specified in 4.b.
    a. this file should contain the following code module.exports = { plugins: [new (require('dotenv-webpack'))()] }
*/