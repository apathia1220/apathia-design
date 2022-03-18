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
  CSSTransition

6、组件完美开发工具应有的特点
   分开展示各个组件不同属性下的状态
   能追踪组件的行为并且具有属性调试功能
   可以为组件自动生成文档和属性列表

7、测试input作为受控组件时，state初始化时，value和sefaultvalue同时设置为state的值时会出错
  解决办法：在组件代码中，增加逻辑，判断是不是要设定为受控组价，即判断value在不在props中，在则移除defaultvalue值
  设置state时不设置初始值会出错，因为从非受控组件转化为了受控组件，state不设置时是undefined
  解决办法：在组件逻辑中判断如果value是undefined或者null  如果是则返回''，不是则返回value

8、autoComplete
  选中一个下拉菜单的值的时候会再次发起一次请求
  解决办法：使用useRef()定义一个控制发送请求的变量

9、upLoad
   上传文件也是有生命周期的
   start --> beforeUpdate --> onProgress --> onChange --> onSuccess or onError