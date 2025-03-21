---
createTime: 2025/3/16
tag: '工程化,npm'
---
# 运行多个 npm script 的各种姿势

## 让多个 npm script 串行？&&

在我们运行测试之前确保我们的代码都通过代码检查会是比较不错的实践，这也是让多个 npm script 串行的典型用例，实现方式也比较简单，只需要用 && 符号把多条 npm script 按先后顺序串起来即可

## 让多个 npm script 并行？ &

在严格串行的情况下，我们必须要确保代码中没有编码规范问题才能运行测试，在某些时候可能并不是我们想要的，因为我们真正需要的是，代码变更时同时给出测试结果和测试运行结果。这就需要把子命令的运行从串行改成并行，实现方式更简单，把连接多条命令的 && 符号替换成 & 即可。

## wait

npm 内置支持的多条命令并行跟 js 里面同时发起多个异步请求非常类似，它只负责触发多条命令，而不管结果的收集

加上 wait 的额外好处是，如果我们在任何子命令中启动了长时间运行的进程，比如启用了 mocha 的 --watch 配置，可以使用 ctrl + c 来结束进程，如果没加的话，你就没办法直接结束启动到后台的进程。

## 有没有更好的管理方式？  npm-run-all

用如下命令将 npm-run-all 添加到项目依赖中：

### 下载依赖

```js
npm i npm-run-all -D
```

### 使用

```js
npm-run-all xxx1 xxx2 xxx3
```

npm-run-all 还支持通配符匹配分组的 npm script，上面的脚本可以进一步简化成

```js
npm-run-all xxx*
```

### 如何让多个 npm script 并行执行？

```js
npm-run-all --parallel xxx:* 
```
