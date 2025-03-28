---
createTime: 2025/3/16
tag: 'js,面试题,设计模式'
---
# 代理模式

## 场景

平常业务开发中， 对于网络请求，我们一般会封装成一个模块，并且暴露 `get`、`post` 方法供大家使用。

```js
// src/util/request.js
import Http from '../http';

export function get(options) {
    return Http.get(options);
}

export function post(obj) {
    return Http.post(options);
}


```

`Http` 模块主要是将 `ajax` 请求封装，填充一些 `headers` 等等，然后业务方使用的时候只需要引入上边的 `get`、`post` 即可。

```js
import { post, get } from 'src/util/request';

async generateShareImage() {
  const body = this.generateConfig();
  try {
    const res = await post({
      url: '/getData',
      body,
      setting: {
        domain: config.getExhibitionDomain(),
      },
    });
    if (res?.picUrl) {
      return res;
    }
    return null;
  } catch (error) {
    log.error(`失败`, JSON.stringify(error));
  }
  return null;
}

```

现在有了一个新需求，我们需要将第一次请求中，后端返回请求中的 `graytype` 字段塞到后续请求中的 `headers` ，也就是下边这样。

```js
import { post, get } from 'src/util/request';
let graytype = -1;
async generateShareImage() {
  const body = this.generateConfig();
  try {
    const options = {
      url: '/getData',
      body,
      setting: {
        domain: config.getExhibitionDomain(),
      },
      headers: {
        
      }
    }
    // 之前拿到了 graytype 就塞入
    if (graytype !== -1) {
       options.headers.graytype = graytype;
    }
    const res = await post(options);
    // 新增逻辑
    if (res.graytype !== undefined && res.graytype !== null) {
        graytype = res.graytype;
    }
    if (res?.picUrl) {
      return res;
    }
    return null;
  } catch (error) {
    log.error(`失败`, JSON.stringify(error));
  }
  return null;
}

```

如果只是一个请求的话就按上边这样改就可以了，但如果是多个请求一个一个这样去改就有些傻了。

那直接去改 `Http` 模块？也是不行的，增加 `graytype` 字段只是我们负责业务的改变，而 `Http` 模块是所有业务线所共用的，我们并不能直接去改变它。

此时就需要代理模式了。

## 代理模式

贴一下 [维基百科](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FProxy_pattern "https://en.wikipedia.org/wiki/Proxy_pattern")的一些解释：

> ### What problems can the Proxy design pattern solve?
>
> * The access to an object should be controlled.
> * Additional functionality should be provided when accessing an object.
>
> ### What solution does the Proxy design pattern describe?
>
> Define a separate `Proxy` object that
>
> * can be used as substitute for another object (`Subject`) and
> * implements additional functionality to control the access to this subject.

代理模式就是对原有对象进行扩展，从而实现对原对象的控制或者进行额外的操作，不同场景下代理模式又可以细分出很多类别：

1. 远程代理：通过代理模式，实现像操作本地对象一样的操作远程对象。

2. 虚拟代理：In place of a complex or heavy object, a skeleton representation may be advantageous in some cases. 常见的比如大图的加载，我们可以通过引入代理对象，先加载一张小图，大图加载完毕后再显示大图。

3. 保护代理：将原有对象的属性访问进行权限控制。

4. 缓存代理：引入缓存，将之前的结果进行缓存，常见的比如斐波那契数列。

    ...

不管起了什么新名字，它们的本质都是一样的，如果用类图表示就是下边的样子：

![image-20220108105835662](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea8366ee581f4b8c802a074f1c9b3e39~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

原对象 `RealSubject` 和 `Proxy` 对象都继承了 `Subject` 这个接口，客户端 `Client` 调用 `DoAction()` 方法，先经过代理对象 `Proxy` ，然后由 `Proxy` 做一些额外的操作，最终再委托给 `RealSubject` 进行执行。

看一个 `Java` 的示例：

```java
interface Image {
    public void displayImage();
}

// On System A
class RealImage implements Image {
    private final String filename;

    /**
     * Constructor
     * @param filename
     */
    public RealImage(String filename) {
        this.filename = filename;
        loadImageFromDisk();
    }

    /**
     * Loads the image from the disk
     */
    private void loadImageFromDisk() {
        System.out.println("Loading   " + filename);
    }

    /**
     * Displays the image
     */
    public void displayImage() {
        System.out.println("Displaying " + filename);
    }
}

// On System B
class ProxyImage implements Image {
    private final String filename;
    private RealImage image;
    
    /**
     * Constructor
     * @param filename
     */
    public ProxyImage(String filename) {
        this.filename = filename;
    }

    /**
     * Displays the image
     */
    public void displayImage() {
        if (image == null) {
           image = new RealImage(filename);
        }
        image.displayImage();
    }
}

class ProxyExample {
   /**
    * Test method
    */
   public static void main(final String[] arguments) {
        Image image = new ProxyImage("HiRes_10MB_Photo1");
        image.displayImage();
    }
}

```

原有的 `RealImage` 类在 `new` 对象的时候就会调用 `loadImageFromDisk`，如果之后没有调用 `displayImage` 并且 `loadImageFromDisk` 比较占资源，那就会是一种浪费。

通过 `ProxyImage` ，其内部持有 `RealImage` 的对象，当调用 `displayImage` 再去实例化对象，实现了对象的延迟加载。

当然也带来了坏处，可能会导致第一次调用 `displayImage` 的时候比较耗时。因此，在这个示例下是否引入代理模式，就看实际场景下的取舍了。

我们再用 `js` 来改写一下：

```js
function RealImage(filename) {
    this.filename = filename;
    const loadImageFromDisk = () => {
        console.log('Loading   ' + filename);
    };
    loadImageFromDisk();
    return {
        displayImage: () => {
            console.log('Displaying ' + filename);
        },
    };
}

function ProxyImage(filename) {
    this.filename = filename;
    let image = null;
    return {
        displayImage: () => {
            if (image === null) {
                image = RealImage(filename);
            }
            image.displayImage();
        },
    };
}

// Test
const image = ProxyImage('HiRes_10MB_Photo1');
image.displayImage();

```

整体思想是一样的，但 `js` 不用定义接口，也不用定义类，看起来精简了不少。只需要实现和原对象一样的返回即可。

## 代码实现

回到最开始的场景：现在有了一个新需求，我们需要将第一次请求中，后端返回请求中的 `graytype` 字段塞到后续请求中的 `headers` 。

我们可以通过代理模式将 `request.js` 中的 `get` 和 `post` 进行封装，然后同样暴露出 `get` 和`post` 即可。

```js
// src/util/requestNew.js

import { post as Post, get as Get } from './request.js';

let graytype = -1;

const getNewParams = (params) => {
    // 将 graytype 加入
    if (graytype !== -1) {
        newParams = {
            ...params,
            headers: {
                ...params.headers,
                graytype,
            },
        };
    }
    return newParams;
};
export const get = async (params) => {
    const response = await Get(getNewParams(params));
    const res = response.data;
    if (res.graytype !== undefined && res.graytype !== null) {
        graytype = res.graytype;
    }
    return response;
};
export const post = async (params) => {
    const response = await Post(getNewParams(params));
    const res = response.data;
    if (res.graytype !== undefined && res.graytype !== null) {
        graytype = res.graytype;
    }
    return response;
};

```

我们将原有的 `get` 和 `post` 导入，因为还需要导出 `get` 和 `post` ，所以将导入的重命名为 `Get` 和 `Post` 。

然后在请求前将 `grayType` 塞入到 `headers` ，并且 `get` 和 `post` 的时候给 `grayType` 进行赋值。

这样在实际业务中，如果需要 `grayType` ，我们只需要从新写的 `src/util/requestNew.js` 引入 `get` 和 `post` 即可，其他什么都不需要改动。
