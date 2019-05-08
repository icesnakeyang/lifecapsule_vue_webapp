import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueI18n from 'vue-i18n'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueI18n)

//启动多语言设置
import chinese from '@/language/chinese'
import english from '@/language/english'

const messages = {
  zh: chinese,
  en: english
}
const i18n = new VueI18n({
  //默认设置为英语
  locale: 'en',
  messages
})

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: {App},
  template: '<App/>'
})
