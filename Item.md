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

  组件测试：通用测试工具Jest测试（create-react-app内置）

4、设计Menu
  横向:1、不可下拉
       2、可下拉
  纵向：

5、Icon和Transition
Transition包裹Button节点时，Button组件本身的动画会取代定义的Transition上的动画效果，导致丢失动画效果
解决方案：在Transition中添加一个可选的props：wrapper，如果传入wrapper则在Transition中为子组件添加一个空节点