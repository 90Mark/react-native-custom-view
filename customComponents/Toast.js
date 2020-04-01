/**
 * Created by Mark on 2020/3/17.
 */
import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import RootSiblings from 'react-native-root-siblings'

import { Colors, Images } from '../res'

export default {
  show,
  showSuccess,
  showError,
  showWarning
}
const timeout = 2000

function show (text, icon) {
  this.view && this.view.destroy()
  this.timer && clearTimeout(this.timer)
  this.view = new RootSiblings(
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: Colors.clearColor
    }}>
      <TouchableWithoutFeedback>
        {_renderView(text, icon)}
      </TouchableWithoutFeedback>
    </View>
  )
  this.timer = setTimeout(() => {
    this.view && this.view.destroy()
    this.timer && clearTimeout(this.timer)
  }, timeout)
  return this.view
}

function hide () {
  this.view && this.view.destroy()
}

function _renderView (text, icon) {
  return (
    <View style={styles.container}>
      <View style={icon ? styles.blackView : styles.onlyText}>
        {icon ?
          (<Image
            style={styles.img}
            resizeMode={'contain'}
            source={icon} />) : null}
        {text ? (
          <Text style={styles.TextStyle}>
            {text}
          </Text>) : null}
      </View>
    </View>
  )
}

function showSuccess (message) {
  this.show(message, Images.toastSuccess)
}

function showWarning (message) {
  this.show(message, Images.toastWorning)
}

function showError (message) {
  this.show(message, Images.toastError)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.clearColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blackView: {
    backgroundColor: Colors.blackAlpha_60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 180,
    minHeight: 75,
    padding: 12
  },
  onlyText: {
    backgroundColor: Colors.blackAlpha_60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 12
  },
  TextStyle: {
    color: Colors.white
  },
  img: {
    width: 35,
    height: 35,
    marginBottom: 10
  }
})
