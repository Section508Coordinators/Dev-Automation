module.exports = {
  name: 'Example App',
  displayName: {
    name: 'Example',
    color: 'blue',
  },
  preset: '../jest.preset.js',
  "reporters": [
    "default",
    ["../node_modules/jest-html-reporter", {
      "pageTitle": "Test Report"
    }],
    ["../node_modules/jest-aggregate-json-reporter", {
      "outputFile": "tests/results.json"
    }]
  ]
};
