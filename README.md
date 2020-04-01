本文档，适用于ReactNative 项目


目前共提供四个组件

Dialog
Loading
Modal
Toast


<img src="https://github.com/90Mark/react-native-custom-view/blob/master/readmeRes/1.png" width="150" height="100" align="middle" />


<img src="https://github.com/90Mark/react-native-custom-view/blob/master/readmeRes/2.png" width="150" height="100" align="middle" />


<img src="https://github.com/90Mark/react-native-custom-view/blob/master/readmeRes/3.png" width="150" height="100" align="middle" />


<img src="https://github.com/90Mark/react-native-custom-view/blob/master/readmeRes/4.png" width="150" height="100" align="middle" />


<img src="https://github.com/90Mark/react-native-custom-view/blob/master/readmeRes/5.png" width="150" height="100" align="middle" />


<img src="https://github.com/90Mark/react-native-custom-view/blob/master/readmeRes/6.png" width="300" height="200" align="middle" />


---
使用方法:

安装


    npm install react-native-custom-view --save

导入

    import { Dialog, Loading, Modal, Toast} from 'react-native-custom-view'


具体可参考源码，这里列举的是常用的方法


---
-Dialog---

   * @note leftVisible 显示左侧按钮
   * @note canHide 可以隐藏（返回键、点击空白区域）
   * @note title 标题
   * @note titleColor 标题颜色
   * @note titleSize 标题大小
   * @note message 消息
   * @note messageColor 消息字体颜色
   * @note messageTextSize 消息字体大小
   * @note leftText 左侧按钮文字
   * @note leftColor 左侧按钮颜色
   * @note leftPress 左侧按钮点击回调
   * @note rightText 右侧按钮文字
   * @note rightColor 右侧按钮颜色
   * @note rightPress 右侧按钮点击回调
   * @note transparent 透明
   * @note onShow 显示回调
   * @note onDismiss 隐藏回调


简单使用

    Dialog.show({
      title: '标题',
      subTitle: '子标题'
    })



---
-Toast---

// 普通吐司

    Toast.show('message')

// 带图片的吐司

    Toast.showError('message')
    Toast.showSuccess('message')
    Toast.showWarning('message')


---
-Loading---

带菊花的loading

    Loading.show('请稍等')
    Loading.hide()






---
-Modal---


   * @param options 参数
   * @note onRequestClose 拦截Android返回键
   * @note transparent 透明
   * @note onShow 显示回调
   * @note onDismiss 隐藏回调


    var modal = Modal.show(render(options), options)

    Modal.hide(modal, onDismiss)



---
   其他不常用的可参考源码

   有任何疑问或建议可在评论区留言
    
_by  90Mark