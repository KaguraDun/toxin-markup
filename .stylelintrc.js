module.exports = {
  extends: ["stylelint-config-rational-order",
            "stylelint-prettier/recommended"],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    // airbnb rules
    indentation: 2,
    'number-leading-zero': 'never',
    'selector-max-id': 0,
    'selector-list-comma-newline-after': 'always',
    'rule-empty-line-before': [
      'always',
      { ignore: ['after-comment'] },
    ],
    'comment-empty-line-before': [
      'always',
      { except: ['first-nested'] },
    ],
    'block-opening-brace-space-before': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-property-value-disallowed-list': { '/^border/': ['none'] },

    // Sass rules
    'max-nesting-depth': 2,
    'scss/dollar-variable-pattern': '^_?[a-z]+[\\w-]*$',
    'scss/at-extend-no-missing-placeholder': true,
  }
};