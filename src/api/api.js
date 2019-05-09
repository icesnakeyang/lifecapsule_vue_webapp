import axios from 'axios'
import store from '../store/index'

const host = 'http://127.0.0.1:8088'

export const apiRegister = params => {
  return axios.post(`${host}/user/registerme`, params)
}

export const apiLogin = params => {
  return axios.post(`${host}/user/loginUser`, params)
}

export const apiAddNote = params => {
  return axios.post(`${host}/note/createNote`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetNote = params => {
  console.log(params.noteId)
  return axios.post(`${host}/note/getNoteDetailByNoteId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiListNote = params => {
  console.log(store.state.gogo_token)
  return axios.post(`${host}/note/listNoteByUserToken`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiEditNote = params => {
  return axios.post(`${host}/note/updateNote`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiCreateNoteCategory = params => {
  return axios.post(`${host}/category/createCategory`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiListCategory = params => {
  return axios.post(`${host}/category/listCategory`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiUpdateNoteCategory = params => {
  return axios.post(`${host}/category/updateCategory`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiDeleteCategory = params => {
  return axios.post(`${host}/category/deleteCategory`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiListNoteByCategory = params => {
  return axios.post(`${host}/note/listNoteByCategory`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetRecipientByRecipientId = params => {
  return axios.post(`${host}/recipient/getRecipientByRecipientId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiCreateRecipientPerson = params => {
  return axios.post(`${host}/recipient/createRecipientPerson`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiListRecipientByNoteId = params => {
  return axios.post(`${host}/recipient/listRecipientByNoteId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const listRecipientPersonByRecipientId = params => {
  return axios.post(`${host}/recipient/listRecipientPersonByRecipientId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetPersonByPersonId = params => {
  return axios.post(`${host}/recipient/getPersonByPersonId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}
