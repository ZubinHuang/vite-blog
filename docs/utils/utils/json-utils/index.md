---
createTime: 2025/3/16
tag: 'utils'
---
# json-utils

## safeJsonParse JSON 转换

```javascript
const safeJsonParse = (str) => {
  if (!str || typeof str != 'string') {
    return str
  }
  return JSON.parse(str)
}
```
