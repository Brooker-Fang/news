import Vue from 'vue'
import detail from './newdetail'

const app = new Vue(detail)
app.$mount()
export default {
  config: {
    "enablePullDownRefresh": true,
  }
}
