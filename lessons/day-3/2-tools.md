# Tools

## Setting up a new project

- We use `node` and `yarn` to manage dependencies and build the project

  ```bash
  yarn init
  ```

- `package.json`
  - dependencies
  - devDependencies
- Add typescript compiler

  ```bash
  yarn add -D typescript
  ```

- `tsc`
  - 1:1 file mapping - ts to plain js
  - For node (server-side) code, we're done here
- `tsconfig.json`

  ```json
  {
    "compilerOptions": {
      "strict": true,
      "target": "es2018",
      "outDir": "./lib",
      "rootDir": "./src",
      "lib": ["ESNext", "DOM"],
      "sourceMap": true
    },
    "exclude": ["node_modules"]
  }
  ```

- Run individual files with `node`

  - `node lib/foo.js`

- `webpack`

  - for client code
  - dev server, with live reloading
  - plugins, like minifiers

  ```bash
  yarn add -D ts-loader webpack webpack-cli webpack-dev-server
  ```
