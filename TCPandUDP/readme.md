![网络模型](https://github.com/zhoujin4515/Blog/blob/master/TCPandUDP/%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%9E%8B.jpeg)

### TCP协议的作用 (Transmission Control Protocol)
如果没有`TCP`和`IP`层，只有MAC对应的数据链路层，HTTP等协议能跑多远？
HTTP的数据通过网卡的接口函数完成数据的发送和接收。
那么怎么保证数据的万无一失呢？网卡不能保证数据的可靠传输，所以HTTP需要自己实现数据传输的可靠机制，比如发送一段数据，先等待对方发送确认收到的通知，然后再来发送，这样是可以保证数据的可靠传输

同样FTP,STMP都是要保证数据的可靠传输，所以它们都需要实现数据可靠的传输，这些可靠性传输机制都可以使用同样的实现，那么就有了`TCP`, 它封装了一个可靠性传输机制的接口函数API, 即socket, 同时用`TCP Port`来辨别其服务的application Protocol。。如果没有`TCP`，那么每一个应用层协议需要可靠传输机制时都需要在应用层实现这个功能，有了`TCP`协议，应用层协议application Protocol 只需要对自己协议本身和协议数据做解释，完成端对端的会话。

### IP协议的作用（Internet Protocol）
如果没有`IP`层，HTTP + TCP + 以太网能跑多远，也就是一个广播域的范围，`IP`协议就是解决这个问题的，`IP`让 `internet` 互联网 成为可能， `IP` 是 Internet Protocol 的简写。

### UTP协议的作用（User Datagram Protocol）
如果没有TCP层，只有IP层，我们把数据封装到IP层，这样也是可以的，现有很多应用层协议就是这么做的，如果需要可靠传输机制则自己用代码实现。
但是有一个问题，IP层只有一个字节用来表示协议号，理论上最多辨识255种上层协议，资源非常紧张。为了解决资源紧张的问题，于是有了一个什么是都不干，只用来辨别 application protocol 的东西：`UDP`

`UTP`提供了一个Port来分辨 应用层协议，它有两个字节，理论上最多辨识65535种上层协议，`UTP`不提供可靠传输机制，它是无状态的协议，IP协议也是无状态的，会话的所有状态都由application protocol控制，例如`TFTP`协议，`TFTP`自己实现了可靠传输机制。

### 总结
- `IP` 提供网络地址，提高传输范围
- `TCP` 提供可靠传输机制
- `UDP` 提供更多的协议号

### TCP 为什么是三次握手
`TCP` 提供可靠的传输机制，是有状态的。
报文类型
- SYN: 请求建立一个连接（说明这是链接的开始）
- DATA:（唯一携带用户数据）
- FIN: 表示本端要断开链接了（说明这是链接的结束）
- RESET: 重置链接
- ACK: 确认ACK报文

![三次握手](https://github.com/zhoujin4515/Blog/blob/master/TCPandUDP/start.png)
1. A发送SYN 报文给B，这是第一次报文交互。
2. B发送ACK确认A的SYN报文，这是第二次报文交互
3. B发送自己的SYN报文给A，这是第三次报文交互
4. A需要ACK确认B的SYN报文，这是第四次报文交互
以上的演绎没有问题，但是报文2、3为何要分开发送呢？增加了延迟不说，同时还白白浪费了网络的带宽，完全可以将报文2、3合并起来，不就是在报文2的ACK状态位的位置置“1”就结了吗？

这就是三次消息交互的由来！

![四次挥手](https://github.com/zhoujin4515/Blog/blob/master/TCPandUDP/end.png)

ack是为了让对方闭嘴。结束，
1. A不停的说,我想结束，不再发了。FIN
2. B收到后，但是还有数据没处理完，就发ack让A闭嘴。等我处理完再说。 ACK
3. B终于处理完了，不停对A说，满足你结束吧。 FIN
4. A知道B要结束了，给B说，可以闭嘴了，我结束。B收到结束，不再发送确认，进入关闭态 ACK