# vue-example-client-server

vue简单前后端例子,介绍vue-router和vue以及一些简单的打包

依赖(具体请看文档): 

      安装node.js v8.12.0 及以上
      安装go 1.10.1 及以上
      cd vue-example;npm install (部署client开发环境依赖)
      export GOPATH=$HOME/xxxx/vue-example-client-server
      cd vue-example-client-server;go get -v github.com/gin-gonic/gin

运行client开发服务器:

      1. 修改package.json中的ip到你自己的ip和端口
      2. npm run dev
      3. 浏览器打开对应http://ip:port/
      
开发结束，希望打包client到生产环境，请参考example_server目录:

      1. npm run build

运行生产环境完整例子(服务器是利用golang完成的):

      1. 关闭防火墙或者设置规则
      2. cd example_server;go run learn.go
      3. 浏览器打开对应http://ip:port/list
