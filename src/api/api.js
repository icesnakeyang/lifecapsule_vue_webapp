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
  return axios.post(`${host}/note/getNoteDetailByNoteId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiListNote = params => {
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
  return axios.post(`${host}/trigger/getRecipientByRecipientId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiCreateRecipient = params => {
  return axios.post(`${host}/trigger/createRecipient`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiDeleteRecipient = params => {
  return axios.post(`${host}/trigger/deleteRecipient`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}


export const apiUpdateRecipient = params => {
  return axios.post(`${host}/trigger/updateRecipient`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiListTriggerByNoteId = params => {
  return axios.post(`${host}/trigger/listTriggerByNoteId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetTriggerByNoteId = params => {
  return axios.post(`${host}/trigger/getTriggerByNoteId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetTriggerByTriggerId = params => {
  return axios.post(`${host}/trigger/getTriggerByTriggerId`, params, {
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

export const apiAddEmail = params => {
  return axios.post(`${host}/trigger/addEmail`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiSaveGogoKey = params => {
  return axios.post(`${host}/trigger/saveGogoKey`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiListGogoKey = params => {
  return axios.post(`${host}/gogoKey/listGogoKey`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiRequestRSAPublicKey = params => {
  return axios.get(`${host}/security/requestRSAPublicKey`)
}

export const apiCreateGogoPublicKey = params => {
  return axios.post(`${host}/admin/gogokey/createGogoPublicKey`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiDeleteGogoPublicKey = params => {
  return axios.post(`${host}/admin/gogokey/deleteGogoPublicKey`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiListGogoPublicKey = params => {
  return axios.post(`${host}/admin/gogokey/listGogoPublicKey`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetGogoPublicKey = params => {
  return axios.post(`${host}/admin/gogokey/getGogoPublicKey`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetGogoKeyByTriggerId = params => {
  return axios.post(`${host}/trigger/getGogoKeyByTriggerId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiUpdateGogoPublicKey = params => {
  return axios.post(`${host}/admin/gogokey/updateGogoPublicKey`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiDeleteNote = params => {
  return axios.post(`${host}/note/deleteNote`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiDeleteTrigger = params => {
  return axios.post(`${host}/trigger/deleteTrigger`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}
