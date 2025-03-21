---
createTime: 2025/3/16
tag: 'Vue源码'

---

# 总结

* 生成代码阶段也是一个 自顶向下的过程 主要依据在前面转换了 AST 对象去生成相应的代码
* 在生成过程中  首先创建了 codegen 上下文 负责维护整个代码生成阶段中的一些状态数据
  * 当前代码
  * 缩进
  * 以及提供一下修改上下文数据的辅助函数
* 接着生成一些预设代码
  * 比如引入辅助函数
  * 生成静态提升相关代码
* 最后生成与渲染函数相关的代码
  * 比如生成渲染函数的名称和参数
  * 生成资源声明的代码
  * 生成创建 vnode 树的代码
* 在创建 vnode 树的过程中 会先执行 genNode 针对不同节点执行了 不同的代码生成逻辑 过程可能存在递归执行 genNode  的情况 完成整个 vnode 树的构建
* 在整个编译阶段 会给动态节点打上相应的 patchFlag
* 这样在运行阶段就可收集到所有动态节点 形成一个 block tree  
* 在patch 阶段更新组件的时候 可以遍历  block tree 只对比动态节点 达到性能优化
