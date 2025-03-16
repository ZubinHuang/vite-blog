---
createTime: 2025/3/16
tag: '场景题,EventLoop'
---
# EventLoop

```js
  async function async1() {
            console.log('async1 start')
            await async2()
            console.log('async1 end')
        }

        async function async2() {
            console.log('async2')
        }


        console.log('script start')

        setTimeout( function () {
            console.log('setTimeout')
        } , 0 )

        async1()

        new Promise ( function (resolve) {
            console.log('promise1')
            resolve()
        } ).then( function () {
            console.log('promise2')
        } )

        console.log('script end')
                                             //script start、async1 start、async2、promise1、script end、async1 end、promise2、setTimeout、
```
