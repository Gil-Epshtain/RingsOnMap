# RingsOnMap
Draw Ring shapes on top of Google Maps

Rings-on-Map is a example project for using Google-Maps-API. 
The application build with WebPack v3, developed with AngularJS in TypeScript language.

### Version
0.0.1

### Tech

Rings-on-Map uses a number of open source projects to work properly:

AngularJS - is a structural framework for dynamic web apps.
WebPack - is a module bundler. WebPack takes modules with dependencies and generates static assets representing those modules. WebPack provide development server and compile your code for production (minify, uglify etc).

## Installation
RingsOnMap requires [Node.js](https://nodejs.org/) to run.

Once Node.JS was insalled and this project was downloaded. Open the command-line and navigate to the /App directory.
```sh
$ cd App
```

Install the dependencies and devDependencies.

```sh
$ npm i
```

## Execution
You can run this project in two ways: development (loading the application from the memory) or production (loading the application from the disk)

### Devlopment mode
To run this project in development mode run webpack-dev-server by executing the script

```sh
$ npm run dev
```

Once webpack-dev-server loaded, open you browser and navigate to 
```sh
http://localhost:9000
```

### Production mode
To run this project in production mode run webpack by executing the script

```sh
$ npm run prod
```

Once webpack build the application a dist folder will be created. Copy the index.html file to the /dist folder and open the index.html file.

## License

MIT (c) Gil Epshtain

Free Software, Hell Yeah!
