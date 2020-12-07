
module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "@jungsoft/eslint-config/react",
    "@jungsoft/eslint-config/typescript",
    "plugin:import/typescript"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-underscore-dangle": "off",
    "camelcase": "off",
    "import/order": ["error", {
      "pathGroups": [
        {
          "pattern": "~/**",
          "group": "external"
        }
      ]
    }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        paths: ["src"],
        extensions: [
          ".ts",
          ".tsx",
        ],
      },
    },
  },
};
