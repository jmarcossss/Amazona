# ESS Ecommerce App Angular - Project

This is an Angular project that supports multiple environments, including production and development. Each environment can have its own configuration, such as API endpoints and feature flags.

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://cli.angular.io/)

## Installation

To install the dependencies for this project, run the following command in the project directory:

```
npm install
```

## Configuration

The project includes separate environment files for each environment, located in the `src/environments` directory. The default environment is `environment.ts`, while additional environments, such as `environment.prod.ts` and `environment.dev.ts`, can be added as needed.

Each environment file includes environment-specific variables, such as API endpoints or feature flags.

The project also uses .env files to manage environment-specific configuration. Separate .env files, such as .env.production and .env.staging, can be created for each environment. The appropriate .env file is loaded based on the environment using the `custom.webpack.config.ts`.

Then, to run the app in development mode, create the `.env.dev` file based on `.env.example`, at the root of the project (web-app).

## Building and Serving the Application

To build the application for a specific environment, run the following command:

```
env=dev npm run build
```

Where `env` can be `prod`, `dev`, or any other environment you have defined in your Angular project.

To serve the application and run it in a browser, run the following command:

```
env=dev npm run start
```

This will start a development server and serve the application using the specified environment.

## Testing

### To run unit tests, run the following command:

```
env=dev npm run test
```

### To run e2e tests, run the following commands:

Leave the application running

```
env=dev npm run start
```

Run the tests

```
npm run test:e2e
```

### Solutions to possible problems

#### If you are having an error when running the tests. Try the following steps:

Remove node_modules

```
rm -rf node_modules
```

Remove .angular/cache

```
rm -rf .angular/cache
```

Run npm install

```
npm install
```

Run the app again, and then run the tests. It is important that the app is running on port 4200.
