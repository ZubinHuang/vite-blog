---
createTime: 2025/3/16
tag: 'utils'
---
# 图片 utils

## base64 转换 file

```js
const base64ToFile = async (src, name) => {
  const b = await fetch(src)
  const blob = await b.blob()
  return new File([blob], name)
}
```
