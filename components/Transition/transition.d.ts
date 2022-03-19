import React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
declare type TransitionProps = CSSTransitionProps & {
    /**
     * animation:动画的方式
     * wrapper：用于解决子组件动画消失的问题，在子组件外添加一个div，保留原子组件的动画
     */
    animation?: AnimationName;
    wrapper?: boolean;
};
declare const Transition: React.FC<TransitionProps>;
export default Transition;
