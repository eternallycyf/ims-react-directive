<a name="readme-top"></a>

<div align="center">

[//]: # '<img width="160" src="https://avatars.githubusercontent.com/u/17870709?v=4">'

<h1>ims-react-directive</h1>

在 react 中使用 v-if 和 v-show

node 版本 v18.13.0

[Changelog](./CHANGELOG.md) · [Report Bug][issues-url] · [Request Feature][issues-url]

<!-- SHIELD GROUP -->

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![install size][npm-size]][npm-size-url]

[![Test CI status][test-ci]][test-ci-url] [![Deploy CI][release-ci]][release-ci-url] [![Coverage][coverage]][codecov-url]

[![contributors][contributors-shield]][contributors-url] [![forks][forks-shield]][forks-url] [![stargazers][stargazers-shield]][stargazers-url] [![issues][issues-shield]][issues-url]

[![ docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

![](https://github.com/othneildrew/Best-README-Template/raw/master/images/screenshot.png)

<!-- gitpod url -->

[gitpod-badge]: https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod
[gitpod-url]: https://gitpod.io/#https://github.com/ant-design/ims-react-directive

<!-- umi url -->

[dumi-url]: https://img.shields.io/badge/docs%20by-dumi-blue
[father-url]: https://img.shields.io/badge/build%20with-father-028fe4.svg

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/ims-react-directive.svg?style=flat-square&color=deepgreen&label=latest
[npm-url]: http://npmjs.org/package/ims-react-directive
[npm-size]: https://img.shields.io/bundlephobia/minzip/ims-react-directive?color=deepgreen&label=gizpped%20size&style=flat-square
[npm-size-url]: https://packagephobia.com/result?p=ims-react-directive

<!-- coverage -->

[coverage]: https://codecov.io/gh/eternallycyf/ims-react-directive/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/eternallycyf/ims-react-directive/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/eternallycyf/ims-react-directive/workflows/Test%20CI/badge.svg
[release-ci]: https://github.com/eternallycyf/ims-react-directive/workflows/Release%20CI/badge.svg
[test-ci-url]: https://github.com/eternallycyf/ims-react-directive/actions?query=workflow%3ATest%20CI
[release-ci-url]: https://github.com/eternallycyf/ims-react-directive/actions?query=workflow%3ARelease%20CI
[download-image]: https://img.shields.io/npm/dm/ims-react-directive.svg?style=flat-square
[download-url]: https://npmjs.org/package/ims-react-directive

</div>

## 简介

## 快速上手

### 安装

推荐使用 `pnpm` 安装

```bash
pnpm i ims-react-directive -S
```

## ims-react-direcive

在 react 项目中使用 vue 指令，支持自定义指令。

### 安装依赖

```
npm i ims-react-direcive
```

### 使用说明

如果使用 typescript，修改 tsconfig.json 文件

```js
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "ims-react-direcive",
  }
}
```

如果使用 webpack 打包，修改 babel.config.json 或修改.babelrc

```js
// .babelrc / babel.config.json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "ims-react-direcive"
      }
    ]
  ]
}

```

如果使用 vite

```js
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'ims-react-direcive',
    }),
  ],
});
```

如果使用 umi，先安装@babel/preset-react 依赖，然后修改.umirc 配置文件

```js
import { defineConfig } from 'umi';

export default defineConfig({
  extraBabelPresets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        importSource: 'ims-react-direcive',
      },
    ],
  ],
});
```

如果使用 react-create-app，先安装@babel/preset-react，然后修改 package.json 文件，添加 babel 属性。

```js
{
"babel": {
    "presets": [
      "react-app",
      [
        "@babel/preset-react",
        {
          "runtime": "automatic",
          "importSource": "ims-react-direcive"
        }
      ]
    ]
  },
}
```

然后就可以在项目中，使用框架内置的指令

```js
function App() {
  const model = useModel({ name: 'jack' });

  return <div v-if={false} v-show={false}></div>;
}
```

### v-if

和 vue 中的 v-if 一样，这个不仅可以对原生 dom 使用，还能对组件进行使用。

### v-show

和 vue 中的 v-show 一样，这个只能对原生 dom 使用，因为会修改 dom 元素的 style 中 display 属性，如果组件支持 style.display 属性的话，也可以使用 v-show。

### 自定义指令

在项目入口，从`ims-react-direcive/directive`引入`directive`，然后就可以自定义指令了。语法如下：

```js
import { directive } from 'ims-react-direcive/directive';

// name 指令名称
directive('name', {
  // 组件渲染之前，在createElement的时候，在这个生命周期可以处理组件props，然后组件渲染的时候，可以拿到处理后的props。注意这个方法只要组件一重新render，就会触发一次。如果返回false这个组件就不渲染了。
  // value：当前指令的值
  // props：当前组件的props
  create: (value, props) => {
    // example v-show的实现
    if (value === false) {
      if (props?.style) {
        props.style.display = 'none';
      } else {
        props.style = { display: 'none' };
      }
    }
  },
  // dom元素和组件渲染的时候触发，正常情况只会触发一次。如果组件多次销毁和渲染，每次渲染都会触发这个方法。
  // 这个方法里面不能处理props，但是可以拿到组件引用活dom元素引用，可以去调用组件或dom元素的方法
  // ref：如果是组件则是组件引用，如果是dom元素就是dom的引用。
  // value：当前指令的值
  // props：当前组件的props
  mounted: (ref, value, props) => {
    // example v-text的实现
    if (isDOM(ref)) {
      ref.innerText = value;
    }

    // example v-html的实现
    if (isDOM(ref)) {
      ref.innerHTML = value;
    }
  },
  // 这个方法是组件style.display由none转换为block时触发
  // 参数和mounted一样
  show: (ref, value, props) => {
    // example v-focus的实现
    ref?.focus?.();
  },
  // 和show相反
  hidden: (ref, value, props) => {
    // 暂无使用场景
  },
});
```

# 🤝 Contributing

<!-- CONTRIBUTION GROUP -->

> 📊 Total: <kbd>**1**</kbd>

<a href="https://github.com/eternallycyf" title="eternallycyf">
  <img src="https://avatars.githubusercontent.com/u/63464198?v=4" width="50" />
</a>

<!-- CONTRIBUTION END -->

<div align="right">

[![][back-to-top]](#readme-top)

## 📝 License

Copyright © 2020 - present [eternallycyf][profile-url]. <br />
This project is [MIT](./LICENSE) licensed.

<!-- LINK GROUP -->

[profile-url]: https://github.com/eternallycyf

<!-- SHIELD LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square

<!-- contributors -->

[contributors-shield]: https://img.shields.io/github/contributors/eternallycyf/ims-react-directive.svg?style=flat
[contributors-url]: https://github.com/eternallycyf/ims-react-directive/graphs/contributors

<!-- forks -->

[forks-shield]: https://img.shields.io/github/forks/eternallycyf/ims-react-directive.svg?style=flat
[forks-url]: https://github.com/eternallycyf/ims-react-directive/network/members

<!-- stargazers -->

[stargazers-shield]: https://img.shields.io/github/stars/eternallycyf/ims-react-directive.svg?style=flat
[stargazers-url]: https://github.com/eternallycyf/ims-react-directive/stargazers

<!-- issues -->

[issues-shield]: https://img.shields.io/github/issues/eternallycyf/ims-react-directive.svg?style=flat
[issues-url]: https://github.com/eternallycyf/ims-react-directive/issues/new/choose
