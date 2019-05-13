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
    condition_id: '' || localStorage.condition_id
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
    clearTriggerId(ctx) {
      ctx.commit('clearTriggerId')
    },
    saveRecipientId(ctx, recipientId) {
      ctx.commit('saveRecipientId', recipientId)
    },
    saveConditionId(ctx, conditionId) {
      ctx.commit('saveConditionId', conditionId)
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
    clearTriggerId(state) {
      state.trigger_id = null
      localStorage.trigger_id = null
    },
    saveRecipientId(state, recipientId) {
      state.recipient_id = recipientId
      localStorage.recipient_id = recipientId
    },
    saveConditionId(state, conditionId) {
      state.condition_id = conditionId
      localStorage.condition_id = conditionId
    }
  }
})
