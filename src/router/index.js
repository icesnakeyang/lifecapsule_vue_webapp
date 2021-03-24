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
import editTrigger from '@/pages/trigger/edit/editTrigger'
import selectGogoKey from '@/pages/trigger/gogoKey/selectGogoKey'
import editGogoKey from '@/pages/trigger/gogoKey/editGogoKey'

import addRecipient from '@/pages/recipient/new/addRecipient'
import editRecipient from '@/pages/recipient/edit/editRecipient'

import gogoKeyNew from '@/pages/gogoKey/new/gogoKeyNew'
import gogoKeyList from '@/pages/gogoKey/list/gogoKeyList'

import gogoPublicKeyMain from '@/admin/gogoKey/gogoPublicKeyMain'
import gogoPublicKeyNew from '@/admin/gogoKey/gogoPublicKeyNew'

/**
 * admin
 */
import dashboard from '@/admin/dashboard/dashboard'
import adminLayout from "../admin/layout/adminLayout";
import registerBoard from "../admin/register/registerBoard";
import gogoPublicKeyEdit from "@/admin/gogoKey/gogoPublicKeyEdit"

/**
 * settings
 */
import settingPage from "../pages/setttings/settingPage";
import changeLoginPassword from "../pages/setttings/changeLoginPassword";
import publishNote from "../pages/note/publish/publishNote";
import publishNoteHeader from "../pages/note/publish/publishNoteHeader";
import publicNoteViewHeader from "../pages/note/publish/publicNoteViewHeader";
import publicNoteListView from "../pages/note/publish/publicNoteListView";
import publicNoteDetail from "../pages/note/publish/publicNoteDetail";
import editPublicNote from "../pages/note/publish/editPublicNote";
import apiNote from "../pages/note/apiNote/apiNote";
import creativeNoteList from "../pages/creativeNote/creativeNoteList";
import creativeHeader from "../pages/creativeNote/creativeHeader";
import creativeNoteEdit from "../pages/creativeNote/creativeNoteEdit";
import creativeHeaderEdit from "../pages/creativeNote/creativeHeaderEdit";
import taskList from "../pages/task/taskList";
import taskHeader from "../pages/task/taskHeader";
import newTask from "../pages/task/newTask";
import taskDetail from "../pages/task/taskDetail";
import taskMindList from "../pages/task/taskMind/taskMindList";
import taskMindDetail from "../pages/task/taskMind/taskMindDetail";
import taskMindNew from "../pages/task/taskMind/taskMindNew";
import taskMindHeader from "../pages/task/taskMind/taskMindHeader";
import taskMindEdit from "../pages/task/taskMind/taskMindEdit";
import taskEdit from "../pages/task/taskEdit";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/admin',
      component: adminLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          components: {
            adminContent: dashboard
          }
        },
        {
          path: 'registerBoard',
          name: 'registerBoard',
          components: {
            adminContent: registerBoard
          }
        },
        {
          path: 'gogoPublicKeyMain',
          name: 'gogoPublicKeyMain',
          components: {
            adminContent: gogoPublicKeyMain
          }
        },
        {
          path: 'gogoPublicKeyNew',
          name: 'gogoPublicKeyNew',
          components: {
            adminContent: gogoPublicKeyNew
          }
        },
        {
          path: 'gogoPublicKeyEdit',
          name: 'gogoPublicKeyEdit',
          components: {
            adminContent: gogoPublicKeyEdit
          }
        }
      ]
    },
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
          path: 'editGogoKey',
          name: 'editGogoKey',
          components: {
            header: baseHeader,
            content: editGogoKey
          }
        },
        {
          path: 'selectGogoKey',
          name: 'selectGogoKey',
          components: {
            header: baseHeader,
            content: selectGogoKey
          }
        },
        {
          path: 'settingPage',
          name: 'settingPage',
          components: {
            header: baseHeader,
            content: settingPage
          }
        },
        {
          path: 'changeLoginPassword',
          name: 'changeLoginPassword',
          components: {
            header: baseHeader,
            content: changeLoginPassword
          }
        },
        {
          path: 'publishNote',
          name: 'publishNote',
          components: {
            header: publishNoteHeader,
            content: publishNote
          }
        },
        {
          path: 'publicNoteListView',
          name: 'publicNoteListView',
          components: {
            header: publicNoteViewHeader,
            content: publicNoteListView
          }
        },
        {
          path: 'publicNoteDetail',
          name: 'publicNoteDetail',
          components: {
            header: publicNoteViewHeader,
            content: publicNoteDetail,
            footer: baseFooter
          }
        },
        {
          path: 'editPublicNote',
          name: 'editPublicNote',
          components: {
            header: publishNoteHeader,
            content: editPublicNote,
            footer: baseFooter
          }
        },
        {
          path: 'apiNote',
          name: 'apiNote',
          components: {
            header: publishNoteHeader,
            content: apiNote,
            footer: baseFooter
          }
        },
        {
          path: 'creativeNoteList',
          name: 'creativeNoteList',
          components: {
            header: creativeHeader,
            content: creativeNoteList,
            footer: baseFooter
          }
        },
        {
          path: 'creativeNoteEdit',
          name: 'creativeNoteEdit',
          components: {
            header: creativeHeaderEdit,
            content: creativeNoteEdit,
            footer: baseFooter
          }
        },
        {
          path: 'taskList',
          name: 'taskList',
          components: {
            header: taskHeader,
            content: taskList,
            footer: baseFooter
          }
        },
        {
          path: 'newTask',
          name: 'newTask',
          components: {
            header: taskHeader,
            content: newTask,
            footer: baseFooter
          }
        },
        {
          path: 'taskDetail',
          name: 'taskDetail',
          components: {
            header: taskHeader,
            content: taskDetail,
            footer: baseFooter
          }
        },
        {
          path: 'taskMindList',
          name: 'taskMindList',
          components: {
            header: taskMindHeader,
            content: taskMindList,
            footer: baseFooter
          }
        },
        {
          path: 'taskMindDetail',
          name: 'taskMindDetail',
          components: {
            header: taskMindHeader,
            content: taskMindDetail,
            footer: baseFooter
          }
        },
        {
          path: 'taskMindNew',
          name: 'taskMindNew',
          components: {
            header: taskMindHeader,
            content: taskMindNew,
            footer: baseFooter
          }
        },
        {
          path: 'taskMindEdit',
          name: 'taskMindEdit',
          components: {
            header: taskMindHeader,
            content: taskMindEdit,
            footer: baseFooter
          }
        },
        {
          path: 'taskEdit',
          name: 'taskEdit',
          components: {
            header: taskMindHeader,
            content: taskEdit,
            footer: baseFooter
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'register') {
    next()
    return
  }
  if (to.name === 'login') {
    next()
    return
  }
  if (to.name === 'publicNoteDetail') {
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
