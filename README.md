<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">


## Title
Hospital Management System

## Description
Hospital management software can be defined as a digital system that helps manage all patient information and automates billing, scheduling, and appointment processes.We are developing a hospital management system to manage all the processes digitally.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start
$ npm run start

# watch mode
$ yarn run start:dev
$ npm run start:dev

```

## License

Nest is [MIT licensed](LICENSE).

## App skeleton
  ├── apps                                                                   
│   ├── abstracts                          
│   ├── assignment     
│   │   ├── src         
│   │   └── test        
│   ├── common       
│   │   ├── dtos    
│   │   ├── logger  
│   │   └── middleware  
│   ├── database  
│   ├── doctor   
│   │   ├── src  
│   │   └── test   
│   ├── hospital   
│   │   ├── src   
│   │   └── test  
│   └── utils  
├── dist   
│   └── apps   
│       ├── assignment   
│       ├── doctor   
│       └── hospital    
├── libs     
│   └── common     
│       └── src    
└── node_modules   
├── nest-cli.json   
├── package.       
├── README.md   
├── tsconfig.build.      
├── tsconfig.      
└── yarn.lock    