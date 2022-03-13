# Eslint规则：

1. ～No-misleading-character-class：不允许在字符类语法中出现由多个代码点组成的字符

   ```javascript
   reg: /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi, //不能输入特殊表情
   ```

2. ～No-useless-escape: 禁用不必要的转义字符(上面代码)

3. No-undef: 禁用未声明的变量，除非他们在/* *global* */注释中被提到

   ```javascript
   if (this.isWeixin()) {
         // 微信环境下禁用分享
         document.addEventListener(
           "WeixinJSBridgeReady",
           function onBridgeReady() {
             // 通过下面这个API隐藏右上角按钮
             WeixinJSBridge.call("hideOptionMenu");
           }
         );
       }
   ```

4. No-redeclare: 禁止多次声明同一变量

   ![3371611815503_.pic_hd](/Users/chenmeifang/Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/2.0b4.0.9/c2c88a9db40eac3337fa91be49a01ca5/Message/MessageTemp/9e20f478899dc29eb19741386f9343c8/Image/3371611815503_.pic_hd.jpg)

5. No-mixed-spaces-and-tabs: 禁止空格和tab的混合缩进

6. No-trailing-spaces:  禁止行尾空格（不遵守）

7. ～semi：禁止使用分号代替ASI

8. indent：强烈使用一致的缩进

9. prefer-const：要求使用const声明那些声明后不再被修改的变量，变量名全大写

10. spaced-comment：强制在注释中//或/*使用一致的空格

11. Space-infix-ops: 要求操作符周围有空格

12. arrow-spacing：强制箭头函数的箭头前后使用一致的空格

13. object-curly-spacing：强制在大括号中使用一致的空格

14. key-spacing：强制在对象字面量的属性中键和值之间使用一致的间距

15. comma-spacing：强制在逗号后使用一致的空格

16. ～Space-before-blocks: 强制在块之前使用一致的空格

17. ～padded-blocks：要求或禁止块内填充 （不遵守）

18. keyword-spacing：强制在关键字前后使用一致的空格 例如else

19. eqeqeq：要求使用===和！== （参数返回类型不确定）

20. No-unused-vars： 禁止出现未使用过的变量



### 跟vue相关的规则：

1. 总是用key配合v-for
2. 避免v-if和v-for同时用在一个元素上 
3. 为组件样式设置作用域
4. 单文件组件的文件名要么始终是单词大写开头，要么始终是横线连接
5. 多个attribute元素分多行撰写，每个attribute一行





# Eslint

.eslintrc文件相当于package.json文件里面的eslintConfig：

```javascript
"eslintConfig": {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugins:vue/essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "rules": {
    
  }
}
```

错误级别：

1. “off” or 0 关闭规则
2. “warn” or 1 将规则视为一个警告
3. “error” or 2 将规则视为一个错误

![3361611814173_.pic_hd](/Users/chenmeifang/Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/2.0b4.0.9/c2c88a9db40eac3337fa91be49a01ca5/Message/MessageTemp/9e20f478899dc29eb19741386f9343c8/Image/3361611814173_.pic_hd.jpg)

![3271611792863_.pic_hd](/Users/chenmeifang/Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/2.0b4.0.9/c2c88a9db40eac3337fa91be49a01ca5/Message/MessageTemp/9e20f478899dc29eb19741386f9343c8/Image/3271611792863_.pic_hd.jpg)

### 从warning--> error 需要在vue.config.js: 加overlay。

![3421611824499_.pic_hd](/Users/chenmeifang/Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/2.0b4.0.9/c2c88a9db40eac3337fa91be49a01ca5/Message/MessageTemp/9e20f478899dc29eb19741386f9343c8/Image/3421611824499_.pic_hd.jpg)

### .eslinttrc.js文件：

```javascript
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "vue/max-attributes-per-line": [2, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline":"off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/no-v-html": "off",
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'eqeqeq': ["error", "always", {"null": "ignore"}],
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [2, {
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never']
  }
}
```

```
1. ~vue/html-closing-bracket-newline:
2. ~Vue/html-indent
3. ～vue/max-attributes-per-line:
4. ~vue/html-self-closing:
5. ~vue/attributes-order:
```

