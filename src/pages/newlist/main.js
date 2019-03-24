import Vue from 'vue'
import newlist from './newlist'

const listapp = new Vue(newlist)
listapp.$mount()
export default {
  config: {
    "enablePullDownRefresh": true,
  }
}
