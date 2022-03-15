1、安装node-scss windows下缺少编译环境
 npm install -g node-gyp
 保存后 删除之前安装失败的包(第一次安装请跳过此步)
npm uninstall node-sass

重新安装
npm install node-sass

2、使用normalize.css初始化全局样式
使用定义好的全局变量替换原有的写死的属性和颜色

3、设计Button
  不同的Button Type
  不同的BUtton Size
  Disabled状态