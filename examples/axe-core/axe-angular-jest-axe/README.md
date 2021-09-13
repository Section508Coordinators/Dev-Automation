# Angular

Configuration based on [Angular Testing Library examples]()

This Project uses nx-cli https://nx.dev/latest/angular/getting-started/nx-cli
The npm package is https://www.npmjs.com/package/nx

Install the nx-cli globally in your machine with the next command:
```
npm i -g nx
```

Install the npm packages:

```
npm install
```

If you encounter issues with the npm install command, try the following:

```
npm install --legacy-peer-deps
```

Run dev mode, run the test and build

## Run dev mode

```
npm run start
```

## Run tests

```
npm run test
```

## Run build

```
nx build example-app
```

**Important:** The result are located in `dist` folder, including /index.html and others js files. 
Run index.html inside the server, it may be required to see the results.

VScode have this plugin: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
For remote server: You can use nginx, apache or others options.

**Test cases:** you can see the diferents test cases here <a href="https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md" target="_blank">HERE</a> 

**Example:** you need implement a label component and verify if that item is correct or not

1. Go to rules axe-core repo
2. Search label option in the rule ID column
3. Click in the link ACT-Rules
4. Search the differents ways that you can implement the label: 
<a href=" https://act-rules.github.io/rules/307n5z" target="_blank">Click here</a>

## Custom rules
Rules are located in the /axe-config.json file. Rules can be added, updated or deleted. Be careful when updating library version.

