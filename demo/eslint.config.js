// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const rdlabo = require('@rdlabo/eslint-plugin-rules');
// The Ionic 8 matrix uses plugin v21; Ionic 9 uses its renamed v22 rule.
const ionicStandaloneRule = 'prefer-ionic-standalone' in rdlabo.rules
  ? '@rdlabo/rules/prefer-ionic-standalone'
  : '@rdlabo/rules/deny-import-from-ionic-module';

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    plugins: {
      '@rdlabo/rules': rdlabo,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-async-promise-executor": "off",
      "no-prototype-builtins": "off",
      "no-irregular-whitespace": "off",
      "no-unexpected-multiline": "off",
      "@angular-eslint/directive-selector": "off",
      "@angular-eslint/component-selector": "off",
      "@angular-eslint/no-empty-lifecycle-method": "off",
      [ionicStandaloneRule]: 'error',
      '@rdlabo/rules/implements-ionic-lifecycle': 'error',
      '@rdlabo/rules/deny-soft-private-modifier': 'error',
      '@rdlabo/rules/signal-use-as-signal': 'error',
      '@rdlabo/rules/signal-use-as-signal-template': 'error',
    },
  },
  {
    files: ["**/*.html"],
    plugins: {
      '@rdlabo/rules': rdlabo,
    },
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@rdlabo/rules/ionic-attr-type-check': 'error',
    },
  },
  {
    // These replacement entry points deliberately bridge Ionic 8 and 9 imports.
    files: ["src/ionic/ionic.ts", "src/ionic/ionic.v8.ts"],
    rules: {
      [ionicStandaloneRule]: "off",
    },
  }
);
