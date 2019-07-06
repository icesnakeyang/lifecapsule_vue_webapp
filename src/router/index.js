import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

/**
 * base layout
 */
import baseHeader from '@/pages/layout/baseHeader'
import baseLayout from '@/pages/layout/baseLayout'
import baseFooter from '@/pages/layout/baseFooter'


import allBlank from '@/components/allBlank'


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
import triggerListHeader from '@/pages/trigger/list/triggerListHeader'
import newTrigger from '@/pages/trigger/new/newTrigger'
import editTrigger from '@/pages/trigger/edit/editTrigger'
import selectGogoKey from '@/pages/trigger/condition/selectGogoKey'

/**
 * recipient
 */
import addRecipient from '@/pages/recipient/new/addRecipient'
import editRecipient from '@/pages/recipient/edit/editRecipient'

/**
 * condition
 */
import conditionNew from '@/pages/condition/new/conditionNew'
import conditionEdit from '@/pages/condition/edit/conditionEdit'

/**
 * gogoKey
 */
import gogoKeyNew from '@/pages/gogoKey/new/gogoKeyNew'
import gogoKeyList from '@/pages/gogoKey/list/gogoKeyList'

import adminGogoKeyMain from '@/admin/gogoKey/main'
import adminGogoKeyNew from '@/admin/gogoKey/new'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: baseLayout,
      children: [
        {
          path: 'allBlank',
          name: 'allBlank',
          components: {
            content: allBlank
          }
        },
        {
          path: 'adminGogoKeyMain',
          name: 'adminGogoKeyMain',
          components: {
            header: baseHeader,
            content: adminGogoKeyMain
          }
        },
        {
          path: 'adminGogoKeyNew',
          name: 'adminGogoKeyNew',
          components: {
            header: baseHeader,
            content: adminGogoKeyNew
          }
        },
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
          path: 'newTrigger',
          name: 'newTrigger',
          components: {
            header: triggerListHeader,
            content: newTrigger
          }
        },
        {
          path: 'editTrigger',
          name: 'editTrigger',
          components: {
            header: triggerListHeader,
            content: editTrigger
          }
        },
        {
          path: 'addRecipient',
          name: 'addRecipient',
          components: {
            header: baseHeader,
            content: addRecipient
          }
        },
        {
          path: 'editRecipient',
          name: 'editRecipient',
          components: {
            header: baseHeader,
            content: editRecipient
          }
        },
        {
          path: 'conditionNew',
          name: 'conditionNew',
          components: {
            header: baseHeader,
            content: conditionNew
          }
        },
        {
          path: 'conditionEdit',
          name: 'conditionEdit',
          components: {
            header: baseHeader,
            content: conditionEdit
          }
        },
        {
          path: 'gogoKeyNew',
          name: 'gogoKeyNew',
          components: {
            header: baseHeader,
            content: gogoKeyNew
          }
        },
        {
          path: 'gogoKeyList',
          name: 'gogoKeyList',
          components: {
            header: baseHeader,
            content: gogoKeyList
          }
        },
        {
          path: 'selectGogoKey',
          name: 'selectGogoKey',
          components: {
            header: baseHeader,
            content: selectGogoKey
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
    if (to.fullPath === '/') {
      next({
        name: 'noteList'
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
