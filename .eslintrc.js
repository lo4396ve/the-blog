module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        },
        "ecmaVersion": 11,
        "sourceType": "module",
    },
    "plugins": [
        "react",
        "html"
    ],
    "rules": {
        "no-unused-vars": "warn",
        "react/prop-types": "warn",
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};
