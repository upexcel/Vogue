# FrontendApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



## Application Structure

The application structure presented below is to be strictly followed while developing the the application. The functionality is grouped in to modules based on its feature and routes falls under similar category. The same module structure is to be followed inside **components**, **redux**, **style** which contains related content modulewise.

```
|- e2e/                                             # end-to-end-tests
  |----- app.e2e-spec.ts
  |----- app.po.ts
  |----- tsconfig.e2e.json

|- node_modules/                                    # npm dependencies

|- dist/                                            # public facing app. built things go here. this wont show until we run a build

|- src/                                             # where most of the work will be done
  |----- app/
      |----- app.component.css|html|spec.ts|ts      # It is the root component
      |----- app.module.ts                          # Defines AppModule, the root module that tells Angular how to assemble the application.
      |----- app-routing-module.ts                  # Defines Root router.
  |----- assets/                                    # A folder where you can put images and anything else to be copied wholesale when you build your application.
  |----- environments/
      |----- environment.prod.ts|ts                 # This folder contains one file for each of your destination environments, each exporting simple configuration variables to use in your application. 
  |----- favicon.ico                                # Every site wants to look good on the bookmark bar. Get started with your very own Angular icon.
  |----- index.html                                 # The application host page.
  |----- main.ts                                    # Compiles the application with the JIT compiler and bootstraps the application's main module (AppModule) to run in the browser.
  |----- polyfills.ts                               # Different browsers have different levels of support of the web standards. Polyfills help normalize those differences.
  |----- styles.css                                 # Global styles for the application.
  |----- test.ts                                    # This is the main entry point for your unit tests.
  |----- tsconfig.app.json                          # Tells the TypeScript compiler how to transpile TypeScript source files into JavaScript files that run in all modern browsers.
  |----- tsconfig.spec.json                         # TypeScript compiler configuration for the Angular app (tsconfig.app.json) and for the unit tests (tsconfig.spec.json).
  |----- typings.d.ts

// overall configuration
|- .angular-cli.json                                # the main configuration file
|- .editorconfig                                    # editorconfig which is used in some VS Code setups
|- .gitignore                                       # Tooling configuration files
|- karma.conf.js                                    # Configuration for the karma test runner described in the Testing guide.
|- package.json                                     # Identifies npmpackage dependencies for the project.
|- protractor.conf.js                               # Configuration for the protractor end-to-end (e2e) test runner.
|- README.md                                        # Instruction for using this git repository in your project.
|- tsconfig.json                                    # Tells the TypeScript compiler how to transpile TypeScript source files into JavaScript files that run in all modern browsers.
|- tslint.json                                      # The npm installed TypeScript linter inspects your TypeScript code and complains when you violate one of its rules.

```

## Styles

We are using `.scss` to style this application. We emphasize not to use inline as much possible and use class instead. Module structure should be followed to create a `.scss` file for a component.
