import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import baseLayout from '@/components/layout/baseLayout'
import baseHeader from '@/components/layout/baseHeader'
import baseFooter from '@/components/layout/baseFooter'
import loginHeader from '@/components/layout/loginHeader'
import registerHeader from '@/components/layout/registerHeader'
import editNoteHeader from '@/components/layout/editNoteHeader'

import girlList from '@/components/girls/girlList'
import register from '@/components/user/register/register'
import login from '@/components/user/login/login'
import notelist from '@/components/pages/note/notelist'
import newNote from '@/components/pages/note/newNote'
import editNote from '@/components/pages/note/editNote'
import categoryList from '@/components/pages/category/categoryList'
import categoryHeader from '@/components/layout/categoryHeader'
import createCategory from '@/components/pages/category/createCategory'
import categoryEdit from '@/components/pages/category/categoryEdit'

import recipientList from '@/components/pages/recipient/recipientList'
import recipient from '@/components/pages/recipient/recipient'
import addPerson from '@/components/pages/recipient/addPerson'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: baseLayout,
      children: [
        {
          path: '/register',
          name: 'register',
          components: {
            header: registerHeader,
            content: register
          }
        },
        {
          path: '/login',
          name: 'login',
          components: {
            header: loginHeader,
            content: login
          }
        },
        {
          path: 'girlList',
          name: 'girlList',
          components: {
            header: baseHeader,
            content: girlList
          }
        },
        {
          path: 'notelist',
          name: 'notelist',
          components: {
            header: baseHeader,
            content: notelist,
            footer: baseFooter
          }
        },
        {
          path: 'newNote',
          name: 'newNote',
          components: {
            header: baseHeader,
            content: newNote
          }
        },
        {
          path: 'editNote',
          name: 'editNote',
          components: {
            header: editNoteHeader,
            content: editNote
          }
        },
        {
          path: 'categoryList',
          name: 'categoryList',
          components: {
            header: categoryHeader,
            content: categoryList
          }
        },
        {
          path: 'createCategory',
          name: 'createCategory',
          components: {
            header: categoryHeader,
            content: createCategory
          }
        },
        {
          path: 'categoryEdit',
          name: 'categoryEdit',
          components: {
            header: categoryHeader,
            content: categoryEdit
          }
        },
        {
          path: 'recipientList',
          name: 'recipientList',
          components: {
            header: baseHeader,
            content: recipientList
          }
        },
        {
          path: 'recipient',
          name: 'recipient',
          components: {
            header: baseHeader,
            content: recipient
          }
        },
        {
          path: 'addPerson',
          name: 'addPerson',
          components: {
            header: baseHeader,
            content: addPerson
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.name === 'register') {
    next()
    return
  }
  if (to.name === 'login') {
    next()
    return
  }
  if (store.state.gogo_token) {
    next()
    return
  }
  next({
    name: 'login'
  })
})

export default router
