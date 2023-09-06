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

todo
