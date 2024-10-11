# IDM-R3F

![code size](https://img.shields.io/github/languages/code-size/pw-sea-code/idm-r3f?style=flat-square)
![license](https://img.shields.io/github/license/pw-sea-code/idm-r3f?style=flat-square)
![issues](https://img.shields.io/github/issues/pw-sea-code/idm-r3f)

Interactive Design Models - React Three Fiber (IDM-R3F) is an example of an interactive 
web application for exploring an architectural design model. It uses React Three Fiber 
to bridge the gap between Three.js and React.

This repository is a part of this  [project](https://github.com/pw-sea-code/interactivedesignmodels), 
as an example using the React/React Three Fiber frameworks to create UI/interactive components.

## 🚀 Quickstart

### Cloning & Install
You can clone the examples to your local machine using the following commands (from within your desired directory):
```shell
$ git clone --no-checkout --depth=1 https://github.com/PW-SEA-CoDe/InteractiveDesignModels.git
$ cd InteractiveDesignModels
$ git checkout main -- examples
$ rm -rf .git
```

### Dependencies
Once cloned, you will need to install the dependencies. Make sure your working directory is the root of the example you are interested in, and then run the following command (subsituting ```npm``` for your favorite Node.js package manager):
```shell
$ npm install
```
This will reference the package-lock.json file to install all required dependencies. If you have any issues, please submit and issue or reach out for assistance.

###  Deployment & Testing
To deploy a testing environment using ```vite``` run:
```shell
$ npm run dev
```
This will deploy a local version of the web application and you should see the port listed in your terminal output with which to view your app.
Typically this will be http://localhost:XXXX/

To build your application for deployment, you can instead run:
```shell
$ npm run build
```

## Project Structure

```
index.html                            // entry point, contains core elements
index.css                              // base styling, component styling will override
main.jsx                                // main react file, declare components here 
src/↴
        assets/↴                      // assets- dynamic upon state/props
        components/↴            // react components, add subfolders by use
        lib/↴                             // global constants, hooks, helper functions, etc. 
                constants.js         // constants for all components
                hooks.js               // custom React hooks
                types.ts               // custom Typescript types (if using Typescript)
                utils.js                 // helper functions
public/                                // public media/fonts- static
```

## Contributing

Feel free to create an issue/PR if you want to see anything else implemented or find any bugs. 
