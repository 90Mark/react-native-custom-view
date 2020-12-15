/**
 * Created by Mark on 2020/3/17.
 */
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'

import { Colors, Strings } from '../res'
import Modal from './Modal'

let dialog

export default class Dialog {
  /**
   * 显示Dialog
   * @param options 参数
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
   */
  static show = (options) => {
    Modal.hide(dialog)
    options = {
      leftVisible: false,
      canHide: true,
      title: '',
      titleColor: Colors.grey_3a3a3a,
      titleSize: 16,
      message: options.subTitle, // 兼容老版本
      messageStyle: options.messageStyle, // 第二行文本的样式
      messageColor: Colors.grey_333333, // 兼容老版本
      subMessage: options.subMessage, // 第三行文本
      subMessageStyle: options.subMessageStyle, // 第三行文本的样式
      messageTextSize: 14,
      leftText: Strings.cancel,
      leftColor: Colors.grey_3a3a3a,
      leftPress: null,
      rightText: Strings.confirm,
      rightColor: Colors.blue_23a7f5,
      rightPress: null,
      transparent: false,
      onShow: null,
      onDismiss: null,
      ...options
    }
    options.onRequestClose = options.canHide ? null : () => { }
    dialog = Modal.show(render(options), options)
  }

  static hide = (onDismiss) => {
    Modal.hide(dialog, onDismiss)
    dialog = null
  }
}

const onPress = (block, onDismiss) => {
  requestAnimationFrame(() => {
    Dialog.hide(onDismiss)
    if (block) {
      block()
    }
  })
}

const render = (options) => {
  const { title, message, canHide, leftVisible, leftPress, leftColor, leftText, rightPress, rightColor, rightText, onDismiss, titleColor, messageStyle, messageColor, titleSize, subMessage, subMessageStyle, messageTextSize } = options
  const windowHeight = Math.max(Dimensions.get('window').height, Dimensions.get('screen').height)
  const windowWidth = Math.max(Dimensions.get('window').width, Dimensions.get('screen').width)
  return (
    <TouchableWithoutFeedback onPress={() => { canHide && Dialog.hide(onDismiss) }}>
      <View style={[styles.content, {
        height: windowHeight - StyleSheet.hairlineWidth,
        width: windowWidth - StyleSheet.hairlineWidth
      }]}>
        <TouchableWithoutFeedback>
          <View style={styles.dialog}>
            <Text
              style={[styles.title, { color: titleColor, fontSize: titleSize }]}
              allowFontScaling={false}>
              {title}
            </Text>
            {message ? (
              <Text
                style={[styles.message, { color: messageColor, fontSize: messageTextSize }, messageStyle]}
                allowFontScaling={false}>
                {message}
              </Text>
            ) : null}
            {subMessage ? (
              <Text
                style={[styles.subMessageText, subMessageStyle]}
                allowFontScaling={false}>
                {subMessage}
              </Text>
            ) : null}
            <View style={styles.buttonContainer}>
              {leftVisible ? (
                <TouchableHighlight
                  style={styles.leftButton}
                  underlayColor={Colors.grey_f7f7f7}
                  onPress={() => onPress(leftPress, onDismiss)}>
                  <Text
                    style={{ fontSize: 16, color: leftColor }}
                    allowFontScaling={false}>
                    {leftText}
                  </Text>
                </TouchableHighlight>
              ) : null}
              {leftVisible ? (
                <View style={styles.line} />
              ) : null}
              <TouchableHighlight
                style={[styles.rightButton, { borderBottomLeftRadius: leftVisible ? 0 : 4 }]}
                underlayColor={Colors.grey_f7f7f7}
                onPress={() => onPress(rightPress, onDismiss)}>
                <Text
                  style={{ fontSize: 16, color: rightColor }}
                  allowFontScaling={false}>
                  {rightText}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackAlpha_20
  },
  dialog: {
    width: 280,
    backgroundColor: Colors.white,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25
  },
  message: {
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    lineHeight: 20
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    marginTop: 15,
    borderTopColor: Colors.border_shallow,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  leftButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 4
  },
  rightButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 4
  },
  line: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border_shallow
  },
  subMessageText: {
    color: '#888888',
    paddingHorizontal: 20,
    lineHeight: 20
  }
})
