import {apiGetTask, apiRequestRSAPublicKey} from "../api/api";
import {Decrypt, Decrypt2, GenerateRandomString16, RSAencrypt} from "../plugins/crypto";

export const loadEncData = params => {
  let out = null
  return new Promise((resolve, reject)=>{
    apiRequestRSAPublicKey().then((response) => {
      if (response.data.code === 0) {
        const keyAES_1 = GenerateRandomString16();
        params.encryptKey = RSAencrypt(keyAES_1, response.data.data.publicKey)
        params.keyToken = response.data.data.keyToken
        // apiGetTask(params).then((response) => {
        params.fname(params).then((response) => {
          if (response.data.code === 0) {
            out = response.data.data
            let strKey = this.task.userEncodeKey
            strKey = Decrypt2(strKey, keyAES_1)
            out.detail = Decrypt(response.data.data.detail, strKey, strKey)
            resolve(out)
          }else{
            reject(new Error(response.data.code))
          }
        }).catch((error)=>{
          reject(error)
        })
      } else {
        reject(new Error(response.data.code))
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
