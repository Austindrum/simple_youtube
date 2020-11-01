import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Paginate from 'vuejs-paginate'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-youtube/dist/Youtube.js'
Vue.prototype.$video = Video
Vue.config.productionTip = false
Vue.component('Paginate', Paginate);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
