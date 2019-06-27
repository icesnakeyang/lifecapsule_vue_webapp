import CryptoJS from 'crypto-js'

const KEY = CryptoJS.enc.Base64.parse("ZGIyMTM5NTYxYzlmZTA2OA==")
// const KEY = CryptoJS.enc.Base64.parse("ZGIyMTM5NTYxYzlmZTA2OA==")
// const KEY = CryptoJS.enc.Base64.parse("icesnakeyang")
// const IV = CryptoJS.enc.Base64.parse("icesnakeyang")

export function Encrypt(word, keyStr, ivStr) {
  let key=KEY
  let iv=KEY

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }


  console.log(1)
  var encrypted = CryptoJS.AES.encrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  console.log(2)
  console.log(encrypted)
  let ciphertext = encrypted.ciphertext.toString()
  console.log(ciphertext)
  return ciphertext
}

export function Decrypt(cipherText, keyStr, ivStr) {
  console.log('密文:'+cipherText)
  let cipherTextHexStr=CryptoJS.enc.Hex.parse(cipherText)
  let cipherTextBase64Str=CryptoJS.enc.Base64.stringify(cipherTextHexStr)

  let key=KEY
  let iv=KEY
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }

  console.log('key:'+key)
  console.log('iv:'+iv)

  var decrypt = CryptoJS.AES.decrypt(cipherTextBase64Str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)

  return decryptedStr

}
