import axios from 'axios'
import store from '../store/index'

const host = 'http://www.gogorpg.com:8088'
// const host = 'http://localhost:8088'

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
  return axios.post(`${host}/note/listNote`, params, {
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

export const apiGetRecipientByRecipientId = params => {
  return axios.post(`${host}/trigger/getRecipientByRecipientId`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiCreateRecipient = params => {
  return axios.post(`${host}/trigger/saveRecipient`, params, {
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

export const apiSaveLoginPassword = params => {
  return axios.post(`${host}/user/saveLoginPassword`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetUserByToken = params => {
  return axios.post(`${host}/user/getUserByToken`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiPublishNote = params => {
  return axios.post(`${host}/publicNote/publishNote`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiListPublicNote = params => {
  return axios.post(`${host}/publicNote/listPublicNote`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetPublicNoteByNoteId = params => {
  return axios.get(`${host}/publicNote/getPublicNote/` + params)
}

export const apiUpdatePublicNote = params => {
  return axios.post(`${host}/publicNote/updatePublicNote`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiConvertToApi = params => {
  return axios.post(`${host}/userData/convertToApi`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetNoteTiny = params => {
  return axios.post(`${host}/note/getNoteTiny`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetNoteApi = params => {
  return axios.post(`${host}/userData/getNoteApi`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiMoveNoteCategory = params => {
  return axios.post(`${host}/note/moveNoteCategory`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiSaveCreativeNote = params => {
  return axios.post(`${host}/note/creative/saveCreativeNote`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetCreativeNote = params => {
  return axios.post(`${host}/note/creative/getCreativeNote`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiCreateTask = params => {
  return axios.post(`${host}/task/createTask`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiListTask = params => {
  return axios.post(`${host}/task/listTask`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiGetTask = params => {
  return axios.post(`${host}/task/getTask`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiDeleteTask = params => {
  return axios.post(`${host}/task/deleteTask`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiUpdateTask = params => {
  return axios.post(`${host}/task/updateTask`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiCompleteTask = params => {
  return axios.post(`${host}/task/completeTask`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}

export const apiSetTaskProgress = params => {
  return axios.post(`${host}/task/setTaskProgress`, params, {
    headers: {
      token: store.state.gogo_token
    }
  })
}
