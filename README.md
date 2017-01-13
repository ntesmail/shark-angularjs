# shark-angular组件库，基于shark-ui打造的angular组件库


## 一、安装
npm install shark-angular --save

## 二、项目中引用方式
### 1、引入js
> 方式一：require('shark-angular'); （你的项目需要支持commonJs打包和es6）

> 方式二：引用node_modules目录下已打包好的js    /node_modules/shark-angular/dist/shark-angular.ui.js

### 2、引入css
> 我们非常推荐您使用  [shark-css](https://www.npmjs.com/package/shark-css)  shark系列组件库的html/css基石

## 三、demo查看方式
npm install && gulp serve

## 四、部署到测试机
> gulp build --target develop

> forever start app.js --port 9004 --shark-angular（第一次启动）

> forever restartall（重启）

> nginx配置请查看 doc/nginx.conf

    