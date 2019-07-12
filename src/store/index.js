import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gogo_token: '' || localStorage.gogo_token,
    note_id: '' || localStorage.note_id,
    category_id: '' || localStorage.category_id,
    category_name: '' || localStorage.category_name,
    trigger_id: '' || localStorage.trigger_id,
    recipient_id: '' || localStorage.recipient_id,
    trigger_name: '' || localStorage.trigger_name,
    trigger_remark: '' || localStorage.trigger_remark
  },
  actions: {
    saveToken(ctx, token) {
      ctx.commit('saveToken', token)
    },
    saveNoteId(ctx, noteId) {
      ctx.commit('saveNoteId', noteId)
    },
    saveCategory(ctx, category) {
      ctx.commit('saveCategory', category)
    },
    saveTriggerId(ctx, triggerId) {
      ctx.commit('saveTriggerId', triggerId)
    },
    saveTrigger(ctx, trigger) {
      ctx.commit('saveTrigger', trigger)
    },
    clearTriggerId(ctx) {
      ctx.commit('clearTriggerId')
    },
    saveRecipientId(ctx, recipientId) {
      ctx.commit('saveRecipientId', recipientId)
    }
  },
  mutations: {
    saveToken(state, token) {
      state.gogo_token = token
      localStorage.gogo_token = token
    },
    saveNoteId(state, noteId) {
      state.note_id = noteId
      localStorage.note_id = noteId
    },
    saveCategory(state, category) {
      state.category_id = category.categoryId
      localStorage.category_id = category.categoryId
      state.category_name = category.categoryName
      localStorage.category_name = category.categoryName
    },
    saveTriggerId(state, triggerId) {
      state.trigger_id = triggerId
      localStorage.trigger_id = triggerId
    },
    saveTrigger(state, trigger) {
      state.trigger_id = trigger.triggerId
      localStorage.trigger_id = trigger.triggerId
      state.trigger_name = trigger.triggerName
      localStorage.trigger_name = trigger.triggerName
      state.trigger_remark = trigger.triggerRemark
      localStorage.trigger_remark = trigger.triggerRemark
    },
    clearTriggerId(state) {
      state.trigger_id = ''
      localStorage.trigger_id = ''
      state.trigger_name = ''
      localStorage.trigger_name = ''
      state.trigger_remark = ''
      localStorage.trigger_remark = ''
    },
    saveRecipientId(state, recipientId) {
      state.recipient_id = recipientId
      localStorage.recipient_id = recipientId
    }
  }
})
