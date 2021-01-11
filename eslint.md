# ESLint规则

继承自谷歌代码风格[eslint-config-google](https://github.com/google/eslint-config-google/blob/master/index.js)

```json
    "no-cond-assign": "off", //禁止条件表达式中出现赋值操作符
    "no-irregular-whitespace": "error", //禁止不规则的空白
    "no-unexpected-multiline": "error", //禁止出现令人困惑的多行表达式
    "valid-jsdoc": [
        "error",
        { 
            "requireParamDescription": false,
            "requireReturnDescription": false,
            "requireReturn": false,
            "prefer": {
                "returns": "return"
            }
        }
    ],//jsdoc 注释规则
    "curly": [
        "error",
        "multi-line"
    ], //强制所有控制语句使用一致的括号风格
    "guard-for-in": "error", // 要求 for-in 循环中有一个 if 语句
    "no-caller": "error", //禁用 arguments.caller 或 arguments.callee
    "no-extend-native": "error", //禁止扩展原生类型
    "no-extra-bind": "error", //禁止不必要的 .bind() 调用
    "no-invalid-this": "error", //禁止 this 关键字出现在类和类对象之外
    "no-multi-spaces": "error", //禁止使用多个空格
    "no-multi-str": "error", //禁止多行字符串
    "no-new-wrappers": "error", //禁止对 String，Number 和 Boolean 使用 new 操作符
    "no-throw-literal": "error", //禁止抛出异常字面量
    "no-with": "error", //禁用 with 语句
    "prefer-promise-reject-errors": "error", //要求使用 Error 对象作为 Promise 拒绝的原因
    "no-unused-vars": [
        "error",
        {
            "args": "none"
        }
    ], //禁止出现未使用过的变量
    //代码风格
    "array-bracket-newline": "off", //在数组开括号后和闭括号前强制换行 关闭
    "array-bracket-spacing": [
        "error",
        "never"
    ], //强制数组方括号中使用一致的空格
    "array-element-newline": "off", //强制数组元素间出现换行 关闭
    "block-spacing": [
        "error",
        "never"
    ], //禁止或强制在代码块中开括号前和闭括号后有空格
    "brace-style": "error", // 强制在代码块中使用一致的大括号风格
    "camelcase": [
        "error",
        {
            "properties": "never"
        }
    ], //强制使用骆驼拼写法命名约定
    "comma-dangle": [
        "error",
        "always-multiline"
    ], //要求或禁止末尾逗号
    "comma-spacing": "error", //强制在逗号前后使用一致的空格
    "comma-style": "error", //强制使用一致的逗号风格
    "computed-property-spacing": "error", //强制在计算的属性的方括号中使用一致的空格
    "eol-last": "error", //要求或禁止文件末尾存在空行
    "func-call-spacing": "error", //要求或禁止在函数标识符和其调用之间有空格
    "indent": [
        "error",
        2,
        {
            "CallExpression": {
                "arguments": 2
            },
            "FunctionDeclaration": {
                "body": 1,
                "parameters": 2
            },
            "FunctionExpression": {
                "body": 1,
                "parameters": 2
            },
            "MemberExpression": 2,
            "ObjectExpression": 1,
            "SwitchCase": 1,
            "ignoredNodes": [
                "ConditionalExpression"
            ]
        }
    ],
    "key-spacing": "error", //强制在对象字面量的属性中键和值之间使用一致的间距
    "keyword-spacing": "error", //强制在关键字前后使用一致的空格
    "linebreak-style": "error", //强制使用一致的换行风格
    "max-len": [
        "error",
        { //强制一行的最大长度
            "code": 80,
            "tabWidth": 2,
            "ignoreUrls": true,
            "ignorePattern": "goog.(module|require)",
        }
    ],
    "new-cap": "error", //要求构造函数首字母大写
    "no-array-constructor": "error", //禁用 Array 构造函数
    "no-mixed-spaces-and-tabs": "error", //禁止空格和 tab 的混合缩进
    "no-multiple-empty-lines": [
        "error",
        {
            "max": 2
        }
    ], //禁止出现多行空行
    "no-new-object": "error", //禁用 Object 的构造函数
    "no-tabs": "error", //禁用 tab
    "no-trailing-spaces": "error", //禁用行尾空格
    "object-curly-spacing": "error", //强制在大括号中使用一致的空格
    "one-var": [
        "error",
        {
            "var": "never",
            "let": "never",
            "const": "never",
        }
    ], //强制函数中的变量要么一起声明要么分开声明 never=要求每个作用域有多个变量声明
    "operator-linebreak": [ "error","after"],//强制操作符使用一致的换行符
    "padded-blocks": ["error","never"],//要求块内填充
    "quote-props": ["error", "consistent"],//要求对象字面量属性名称使用一致的引号，要么全部用引号，要么都不用
    "quotes": ["error", "single", {"allowTemplateLiterals": true}],//强制使用一致的反勾号、双引号或单引号
    "require-jsdoc": ["error", {
        "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": true,
            "ClassDeclaration": true
        }
    }],//强制JSDoc注释
    "semi": "error",//要求或禁止使用分号代替 ASI
    "semi-spacing": "error",//强制分号之前和之后使用一致的空格
    "space-before-blocks": "error",//强制在块之前使用一致的空格
    "space-before-function-paren": ["error", {
        "asyncArrow": "always",
        "anonymous": "never",
        "named": "never",
    }],//强制在 function的左括号之前使用一致的空格
    "spaced-comment": ["error", "always"],//强制在注释中 // 或 /* 使用一致的空格
    "switch-colon-spacing": "error",//强制在 switch 的冒号左右有空格
    "arrow-parens": ["error", "always"],//要求箭头函数的参数使用圆括号
    "constructor-super": "error", // 要求在构造函数中有 super() 的调用
    "generator-star-spacing": ["error", "after"],//强制 generator 函数中 * 号周围使用一致的空格
    "no-new-symbol": "error", // eslint:recommended 禁止 Symbolnew 操作符和 new 一起使用
    "no-this-before-super": "error",//禁止在构造函数中，在调用 super() 之前使用 this 或 super
    "no-var": "error",//要求使用 let 或 const 而不是 var
    "prefer-const": ["error", {"destructuring": "all"}],//要求使用const声明那些声明后不再被修改的变量
    "prefer-rest-params": "error",//要求使用剩余参数而不是 arguments
    "prefer-spread": "error",//要求使用扩展运算符而非 .apply()
    "rest-spread-spacing": "error",//强制剩余和扩展运算符及其表达式之间有空格
    "yield-star-spacing": ["error", "after"],//强制在 yield* 表达式中 * 周围使用空格

```
