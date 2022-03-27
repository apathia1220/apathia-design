1、安装 node-scss windows 下缺少编译环境
npm install -g node-gyp
保存后 删除之前安装失败的包(第一次安装请跳过此步)
npm uninstall node-sass

重新安装
npm install node-sass

2、使用 normalize.css 初始化全局样式
使用定义好的全局变量替换原有的写死的属性和颜色

3、设计 Button
不同的 Button Type
不同的 BUtton Size
Disabled 状态

组件测试：通用测试工具 Jest 测试（create-react-app 内置）

4、设计 Menu
横向:1、不可下拉
2、可下拉
纵向：

5、Icon 和 Transition
Transition 包裹 Button 节点时，Button 组件本身的动画会取代定义的 Transition 上的动画效果，导致丢失动画效果
解决方案：在 Transition 中添加一个可选的 props：wrapper，如果传入 wrapper 则在 Transition 中为子组件添加一个空节点
CSSTransition

6、组件完美开发工具应有的特点
分开展示各个组件不同属性下的状态
能追踪组件的行为并且具有属性调试功能
可以为组件自动生成文档和属性列表

7、测试 input 作为受控组件时，state 初始化时，value 和 sefaultvalue 同时设置为 state 的值时会出错
解决办法：在组件代码中，增加逻辑，判断是不是要设定为受控组价，即判断 value 在不在 props 中，在则移除 defaultvalue 值
设置 state 时不设置初始值会出错，因为从非受控组件转化为了受控组件，state 不设置时是 undefined
解决办法：在组件逻辑中判断如果 value 是 undefined 或者 null 如果是则返回''，不是则返回 value

8、autoComplete
选中一个下拉菜单的值的时候会再次发起一次请求
解决办法：使用 useRef()定义一个控制发送请求的变量

9、upLoad
上传文件也是有生命周期的
start --> beforeUpdate --> onProgress --> onChange --> onSuccess or onError

10、打包时，文件的上传路径读取方式不同会带来不同的问题，常用的是再用 classic 方式，本次需要使用 node 方式

11、Module '"tapable"' has no exported member 'Tapable'
node_modules/@types/webpack/index.d.ts
在这个文件的引入的 from 'tapable'前面加上 from './tapable'
