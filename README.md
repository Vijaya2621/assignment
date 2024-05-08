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
$ npm install
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
├── abstracts
│   ├── base.entity.ts
│   ├── base.service.ts
│   └── index.ts
├── assignment
│   ├── src
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   └── tsconfig.app.json
├── common
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.services.ts
│   ├── dtos
│   │   └── pagination.dto.ts
│   ├── guards
│   │   └── auth.guard.services.ts
│   ├── logger
│   │   └── logger.ts
│   └── middleware
│       ├── middleware.module.ts
│       └── middleware.service.ts
├── database
│   └── database.config.ts
├── doctor
│   ├── src
│   │   ├── doctor.controller.ts
│   │   ├── doctor.dto.ts
│   │   ├── doctor.entity.ts
│   │   ├── doctor.module.ts
│   │   ├── doctor.schema.ts
│   │   ├── doctor.service.ts
│   │   └── main.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   └── tsconfig.app.json
├── hospital
│   ├── src
│   │   ├── hospital.controller.ts
│   │   ├── hospital.dto.ts
│   │   ├── hospital.entity.ts
│   │   ├── hospital.module.ts
│   │   ├── hospital.schema.ts
│   │   ├── hospital.service.ts
│   │   └── main.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   └── tsconfig.app.json
├── notes
│   ├── src
│   │   ├── main.ts
│   │   ├── notes.controller.ts
│   │   ├── notes.dto.ts
│   │   ├── notes.entity.ts
│   │   ├── notes.module.ts
│   │   ├── notes.schema.ts
│   │   └── notes.service.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   └── tsconfig.app.json
├── patient
│   ├── src
│   │   ├── main.ts
│   │   ├── patient.controller.ts
│   │   ├── patient.dto.ts
│   │   ├── patient.entity.ts
│   │   ├── patient.module.ts
│   │   ├── patient.schema.ts
│   │   └── patient.service.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   └── tsconfig.app.json
└── utils
└── node_modules   
├── nest-cli.json   
├── package.       
├── README.md   
├── tsconfig.build.      
├── tsconfig.      
└── yarn.lock    