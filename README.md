# mini-webpack

迷你webpack打包器

## 一期实现核心逻辑

打包器核心逻辑实现，知识点包括：

- 如何获取文件内容
- 如何通过ast获取文件依赖关系，及依赖graph树的生成
- 各文件打包后代码如何组装
- 如何使用ejs动态拼装成组装后的代码

## 二期实现loader

在获取文件后，转换ast语法树前进行简单loader的实现

- loader的配置设计参考了webpack
- loader本质其实就是拦截非js文件，处理后返回js能识别的代码
- 遵循webpack中use的多loader执行，从后往前
- 加入loader的loader context上下文实现

## 三期实现plugin

插件的原理是基于事件(钩子)去实现的，webpack在不同阶段会有不同的钩子，插件开发者“监听”这些钩子，拿到webpack暴露出来的对象后通过操作对象上的一些方法来去改变webpack的打包行为。

- tapable包，为插件创建钩子的用法，见tabable.js
- 按照webpack的插件规范模拟一个ChangeOutputPath插件
- 如何定义、注册、调用插件
