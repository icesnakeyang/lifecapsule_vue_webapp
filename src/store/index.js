import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gogo_token: '' || localStorage.gogo_token,
    note_id: '' || localStorage.note_id,
    category_id: '' || localStorage.category_id,
    category_name: '' || localStorage.category_name,
    recipient_id: '' || localStorage.recipient_id,
    person_id: '' || localStorage.person_id
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
    saveRecipientId(ctx, recipientId) {
      ctx.commit('saveRecipientId', recipientId)
    },
    savePersonId(ctx, personId) {
      ctx.commit('savePersonId', personId)
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
    saveRecipientId(state, recipientId) {
      state.recipient_id = recipientId
      localStorage.recipient_id = recipientId
    },
    savePersonId(state, personId) {
      state.person_id = personId
      localStorage.person_id = personId
    }
  }
})
