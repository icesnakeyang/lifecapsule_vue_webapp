import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

/**
 * base layout
 */
import baseHeader from '@/pages/layout/baseHeader'
import baseLayout from '@/pages/layout/baseLayout'
import baseFooter from '@/pages/layout/baseFooter'

/**
 * register
 */
import registerHeader from '@/pages/user/register/registerHeader'
import register from '@/pages/user/register/register'

/**
 * login
 */
import loginHeader from '@/pages/user/login/loginHeader'
import login from '@/pages/user/login/login'

/**
 * category
 */
import categoryList from '@/pages/category/list/categoryList'
import categoryHeader from '@/pages/category/list/categoryHeader'
import createCategory from '@/pages/category/new/createCategory'
import categoryEdit from '@/pages/category/edit/categoryEdit'

/**
 * note
 */
import noteList from '@/pages/note/list/notelist'
import editNoteHeader from '@/pages/note/edit/editNoteHeader'
import newNote from '@/pages/note/new/newNote'
import editNote from '@/pages/note/edit/editNote'

/**
 * trigger
 */
import triggerList from '@/pages/trigger/list/triggerList'


import triggerListHeader from '@/pages/trigger/triggerList/triggerListHeader'







import recipient from '@/pages/recipient/list/recipient'
import addPerson from '@/pages/recipient/new/addPerson'
import editPerson from '@/pages/recipient/edit/editPerson'

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
          path: 'noteList',
          name: 'noteList',
          components: {
            header: baseHeader,
            content: noteList,
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
          path: 'triggerList',
          name: 'triggerList',
          components: {
            header: triggerListHeader,
            content: triggerList
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
        },
        {
          path: 'editPerson',
          name: 'editPerson',
          components: {
            header: baseHeader,
            content: editPerson
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
    if(to.fullPath==='/'){
      next({
        name:'noteList'
      })
    }
    next()
    return
  }
  next({
    name: 'login'
  })
})

export default router
