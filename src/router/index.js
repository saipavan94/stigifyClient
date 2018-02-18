import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import createBucket from '@/components/createBucket'
import uploadFiles from '@/components/uploadFiles'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: 'createBucket',
          component: createBucket
        },
        {
          path: 'uploadFiles',
          component: uploadFiles
        }
      ]
    }
  ]
})
