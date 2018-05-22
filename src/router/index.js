import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import register from '@/components/register'
import login from '@/components/login'
import home from '@/components/home'
import seatSelection from '@/components/seatSelection'
import payment from '@/components/payment'
import conformationPage from '@/components/conformationPage'
import bookingHistory from '@/components/bookingHistory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: 'register',
          component: register
        },
        {
          path: '',
          component: login
        },
        {
          path: 'login',
          component: login
        },
        {
          path: 'home',
          component: home
        },
        {
          path: 'seatSelection',
          component: seatSelection
        },
        {
          path: 'payment',
          component: payment
        },
        {
          path: 'conformationPage',
          component: conformationPage
        },
        {
          path: 'bookingHistory',
          component: bookingHistory
        }
      ]
    },
    { path: '*', redirect: '/' }
    // {
    //   path: '*',
    //   component: ;
    // }
  ]
})
