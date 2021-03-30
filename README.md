> 基于 Vue.js 2.0 与 element-ui 实现的系统模板 layouts

## Overview

![微信截图_20210330200151.png](https://cdn.nlark.com/yuque/0/2021/png/455438/1617105739535-97c01ec5-4e2d-4177-841f-a2ba5ef0f024.png#align=left&display=inline&height=903&margin=%5Bobject%20Object%5D&name=%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210330200151.png&originHeight=903&originWidth=1920&size=34826&status=done&style=none&width=1920)

## Install

```javascript
npm install ele-admin-layouts -S
```

## Quick Start

```javascript
import Layouts from 'ele-admin-layouts'
import 'ele-admin-layouts/src/styles/index.scss'
Vue.use(Layouts)
```

## Browser Support

Modern browsers and Internet Explorer 10+.

## Components

### Layout

#### 示例

```javascript
<eal-layout :routes="routes">
  	<template v-slot:header-right>
      <div class="header-right">
        <div class="user">
          <span>欢迎您，admin</span>
        </div>
        <el-button size="mini" class="logout-btn" plain>注销</el-button>
      </div>
    </template>
</eal-layout>
```

#### 参数

| 参数              | 说明                           | 类型   | 可选值 | 默认值 |
| ----------------- | ------------------------------ | ------ | ------ | ------ |
| routes            | 路由数据(用作侧边栏及页签展示) | array  | ——     | ——     |
| logoVisible       | 是否展示侧边栏 logo            | boolen | ——     | true   |
| sidebarWidth      | 侧边栏宽度                     | number | ——     | 220    |
| sidebarCollapse   | 是否展示侧边栏伸缩按钮         | boolen | ——     | false  |
| headerCollapse    | 是否展示 Header 伸缩按钮       | boolen | ——     | true   |
| breadcrumbVisible | 是否展示 Header 面包屑         | boolen | ——     | true   |
| tabsVisible       | 是否展示页签                   | boolen | ——     | true   |
| refresh           | 是否展示路由页面刷新           | boolen | ——     | true   |
| full              | 是否展示内容全屏               | boolen | ——     | true   |

#### slot

| name         | 说明                                    |
| ------------ | --------------------------------------- |
| logo         | 自定义插入 logo，添加后默认 logo 不展示 |
| header-left  | 自定义头部左侧内容                      |
| header-right | 自定义头部右侧内容                      |
