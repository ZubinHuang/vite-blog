---
createTime: 2025/3/16
tag: '计算机'
---
# TCP和UDP的区别

* TCP是面向链接的，而UDP是面向无连接的。
* TCP仅支持单播传输，UDP 提供了单播，多播，广播的功能。
* TCP的三次握手保证了连接的可靠性; UDP是无连接的、不可靠的一种数据传输协议，首先不可靠性体现在无连接上，通信都不需要建立连接，对接收到的数据也不发送确认信号，发送端不知道数据是否会正确接收。
* UDP的头部开销比TCP的更小，数据传输速率更高，实时性更好。

## 一、TCP/IP网络模型

计算机与网络设备要相互通信，双方就必须基于相同的方法。比如，如何探测到通信目标、由哪一边先发起通信、使用哪种语言进行通信、怎样结束通信等规则都需要事先确定。不同的硬件、操作系统之间的通信，所有的这一切都需要一种规则。而我们就把这种规则称为协议（protocol）。

TCP/IP 是互联网相关的各类协议族的总称，比如：TCP，UDP，IP，FTP，HTTP，ICMP，SMTP 等都属于 TCP/IP 族内的协议。

TCP/IP模型是互联网的基础，它是一系列网络协议的总称。这些协议可以划分为四层，分别为链路层、网络层、传输层和应用层。

* 链路层：负责封装和解封装IP报文，发送和接受ARP/RARP报文等。
* 网络层：负责路由以及把分组报文发送给目标网络或主机。
* 传输层：负责对报文进行分组和重组，并以TCP或UDP协议格式封装报文。
* 应用层：负责向用户提供应用程序，比如HTTP、FTP、Telnet、DNS、SMTP等。
![图片](../assets/tcp-udp1.webp)

在网络体系结构中网络通信的建立必须是在通信双方的对等层进行，不能交错。 在整个数据传输过程中，数据在发送端时经过各层时都要附加上相应层的协议头和协议尾（仅数据链路层需要封装协议尾）部分，也就是要对数据进行协议封装，以标识对应层所用的通信协议。接下去介绍TCP/IP 中有两个具有代表性的传输层协议----TCP 和 UDP。

## 二、UDP

UDP协议全称是用户数据报协议，在网络中它与TCP协议一样用于处理数据包，是一种无连接的协议。在OSI模型中，在第四层——传输层，处于IP协议的上一层。UDP有不提供数据包分组、组装和不能对数据包进行排序的缺点，也就是说，当报文发送之后，是无法得知其是否安全完整到达的。

### 它有以下几个特点

#### 1. 面向无连接

首先 UDP 是不需要和 TCP一样在发送数据前进行三次握手建立连接的，想发数据就可以开始发送了。并且也只是数据报文的搬运工，不会对数据报文进行任何拆分和拼接操作。

具体来说就是：

* 在发送端，应用层将数据传递给传输层的 UDP 协议，UDP 只会给数据增加一个 UDP 头标识下是 UDP 协议，然后就传递给网络层了
* 在接收端，网络层将数据传递给传输层，UDP 只去除 IP 报文头就传递给应用层，不会任何拼接操作

#### 2. 有单播，多播，广播的功能

UDP 不止支持一对一的传输方式，同样支持一对多，多对多，多对一的方式，也就是说 UDP 提供了单播，多播，广播的功能。

#### 3. UDP是面向报文的

发送方的UDP对应用程序交下来的报文，在添加首部后就向下交付IP层。UDP对应用层交下来的报文，既不合并，也不拆分，而是保留这些报文的边界。因此，应用程序必须选择合适大小的报文

#### 4. 不可靠性

首先不可靠性体现在无连接上，通信都不需要建立连接，想发就发，这样的情况肯定不可靠。

并且收到什么数据就传递什么数据，并且也不会备份数据，发送数据也不会关心对方是否已经正确接收到数据了。

再者网络环境时好时坏，但是 UDP 因为没有拥塞控制，一直会以恒定的速度发送数据。即使网络条件不好，也不会对发送速率进行调整。这样实现的弊端就是在网络条件不好的情况下可能会导致丢包，但是优点也很明显，在某些实时性要求高的场景（比如电话会议）就需要使用 UDP 而不是 TCP。
![图片](../assets/tcp-udp2.webp)

从上面的动态图可以得知，UDP只会把想发的数据报文一股脑的丢给对方，并不在意数据有无安全完整到达。

#### 5. 头部开销小，传输数据报文时是很高效的

![图片](../assets/tcp-udp3.webp)

UDP 头部包含了以下几个数据：

* 两个十六位的端口号，分别为源端口（可选字段）和目标端口
* 整个数据报文的长度
* 整个数据报文的检验和（IPv4 可选 字段），该字段用于发现头部信息和数据中的错误
* 因此 UDP 的头部开销小，只有八字节，相比 TCP 的至少二十字节要少得多，在传输数据报文时是很高效的

### 三、TCP

当一台计算机想要与另一台计算机通讯时，两台计算机之间的通信需要畅通且可靠，这样才能保证正确收发数据。例如，当你想查看网页或查看电子邮件时，希望完整且按顺序查看网页，而不丢失任何内容。当你下载文件时，希望获得的是完整的文件，而不仅仅是文件的一部分，因为如果数据丢失或乱序，都不是你希望得到的结果，于是就用到了TCP。

TCP协议全称是传输控制协议是一种面向连接的、可靠的、基于字节流的传输层通信协议，由 IETF 的RFC 793定义。TCP 是面向连接的、可靠的流协议。流就是指不间断的数据结构，你可以把它想象成排水管中的水流。

#### 1. TCP连接过程

![图片](../assets/tcp-udp4.webp)

如下图所示，可以看到建立一个TCP连接的过程为（三次握手的过程）:

#### 第一次握手

客户端向服务端发送连接请求报文段。该报文段中包含自身的数据通讯初始序号。请求发送后，客户端便进入 SYN-SENT 状态。

#### 第二次握手

服务端收到连接请求报文段后，如果同意连接，则会发送一个应答，该应答中也会包含自身的数据通讯初始序号，发送完成后便进入 SYN-RECEIVED 状态。

#### 第三次握手

![图片](../assets/tcp-udp5.webp)

当客户端收到连接同意的应答后，还要向服务端发送一个确认报文。客户端发完这个报文段后便进入 ESTABLISHED 状态，服务端收到这个应答后也进入 ESTABLISHED 状态，此时连接建立成功。

这里可能大家会有个疑惑：为什么 TCP 建立连接需要三次握手，而不是两次？这是因为这是为了防止出现失效的连接请求报文段被服务端接收的情况，从而产生错误。

### 2. TCP断开链接

![图片](../assets/tcp-udp6.webp)

TCP 是全双工的，在断开连接时两端都需要发送 FIN 和 ACK。

#### 第一次握手

若客户端 A 认为数据发送完成，则它需要向服务端 B 发送连接释放请求。

#### 第二次握手

B 收到连接释放请求后，会告诉应用层要释放 TCP 链接。然后会发送 ACK 包，并进入 CLOSE_WAIT 状态，此时表明 A 到 B 的连接已经释放，不再接收 A 发的数据了。但是因为 TCP 连接是双向的，所以 B 仍旧可以发送数据给 A。

#### 第三次握手

B 如果此时还有没发完的数据会继续发送，完毕后会向 A 发送连接释放请求，然后 B 便进入 LAST-ACK 状态。

#### 第四次握手

* A 收到释放请求后，向 B 发送确认应答，此时 A 进入 TIME-WAIT 状态。

* 该状态会持续 2MSL（最大段生存期，指报文段在网络中生存的时间，超时会被抛弃） 时间，若该时间段内没有 B 的重发请求的话，就进入 CLOSED 状态。当 B 收到确认应答后，也便进入 CLOSED 状态。

### 3. TCP协议的特点

#### 面向连接

面向连接，是指发送数据之前必须在两端建立连接。建立连接的方法是“三次握手”，这样能建立可靠的连接。建立连接，是为数据的可靠传输打下了基础。

#### 仅支持单播传输

每条TCP传输连接只能有两个端点，只能进行点对点的数据传输，不支持多播和广播传输方式。

#### 面向字节流

TCP不像UDP一样那样一个个报文独立地传输，而是在不保留报文边界的情况下以字节流方式进行传输。

#### 可靠传输

对于可靠传输，判断丢包，误码靠的是TCP的段编号以及确认号。TCP为了保证报文传输的可靠，就给每个包一个序号，同时序号也保证了传送到接收端实体的包的按序接收。然后接收端实体对已成功收到的字节发回一个相应的确认(ACK)；如果发送端实体在合理的往返时延(RTT)内未收到确认，那么对应的数据（假设丢失了）将会被重传。

#### 提供拥塞控制

当网络出现拥塞的时候，TCP能够减小向网络注入数据的速率和数量，缓解拥塞

#### TCP提供全双工通信

TCP允许通信双方的应用程序在任何时候都能发送数据，因为TCP连接的两端都设有缓存，用来临时存放双向通信的数据。当然，TCP可以立即发送一个数据段，也可以缓存一段时间以便一次发送更多的数据段（最大的数据段大小取决于MSS）

### 四、TCP和UDP的比较

#### 1. 对比

#### UDP TCP

* 是否连接 无连接 面向连接
* 是否可靠 不可靠传输，不使用流量控制和拥塞控制 可靠传输，使用流量控制和拥塞控制
* 连接对象个数 支持一对一，一对多，多对一和多对多交互通信 只能是一对一通信
* 传输方式 面向报文 面向字节流
* 首部开销 首部开销小，仅8字节 首部最小20字节，最大60字节
* 适用场景 适用于实时应用（IP电话、视频会议、直播等） 适用于要求可靠传输的应用，例如文件传输

### 五、TCP 和 UDP 应用场景

* UDP的应用场景：即时通信。面向数据报方式；网络数据大多为短消息；拥有大量客户端；对数据安全性无特殊要求；网络负担重但对响应速度要求高的场景。eg: IP电话、实时视频会议等。

* TCP的应用场景：对数据准确性要求高，速度可以相对较慢的。eg: 文件传输、邮件的发送与接收等。

### 六、运行在TCP 或UDP的应用层协议分析

#### 运行在TCP协议上的协议

* HTTP（Hypertext Transfer Protocol，超文本传输协议），主要用于普通浏览。
* HTTPS（HTTP over SSL，安全超文本传输协议）,HTTP协议的安全版本。
* FTP（File Transfer Protocol，文件传输协议），用于文件传输。
* POP3（Post Office Protocol, version 3，邮局协议），收邮件用。
* SMTP（Simple Mail Transfer Protocol，简单邮件传输协议），用来发送电子邮件。
* TELNET（Teletype over the Network，网络电传），通过一个终端（terminal）登陆到网络。
* SSH（Secure Shell，用于替代安全性差的TELNET），用于加密安全登陆用。

#### 运行在UDP协议上的协议

* BOOTP（Boot Protocol，启动协议），应用于无盘设备。
* NTP（Network Time Protocol，网络时间协议），用于网络同步。
* DHCP（Dynamic Host Configuration Protocol，动态主机配置协议），动态配置IP地址。

#### 运行在TCP和UDP协议上

* DNS（Domain Name Service，域名服务），用于完成地址查找，邮件转发等工作。
* ECHO（Echo Protocol，回绕协议），用于查错及测量应答时间（运行在TCP和UDP协议上）。
* SNMP（Simple Network Management Protocol，简单网络管理协议），用于网络信息的收集和网络管理。
* DHCP（Dynamic Host Configuration Protocol，动态主机配置协议），动态配置IP地址。
* ARP（Address Resolution Protocol，地址解析协议），用于动态解析以太网硬件的地址。

## 总结

* TCP向上层提供面向连接的可靠服务 ，UDP向上层提供无连接不可靠服务。
* 虽然 UDP 并没有 TCP 传输来的准确，但是也能在很多实时性要求高的地方有所作为
* 对数据准确性要求高，速度可以相对较慢的，可以选用TCP
