import CryptoJS from 'crypto-js'

const KEY = CryptoJS.enc.Base64.parse("4525ba31a83e0b3a19ba2cbbafecf679de87dda749766b4e911e2d4cc7d25032")
// const KEY = CryptoJS.enc.Base64.parse("ZGIyMTM5NTYxYzlmZTA2OA==")
// const KEY = CryptoJS.enc.Base64.parse("icesnakeyang")
// const IV = CryptoJS.enc.Base64.parse("icesnakeyang")

export function Encrypt(word, keyStr, ivStr) {
  let key = KEY
  let iv = KEY

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
  console.log('密文:' + cipherText)
  console.log('keyStr', keyStr)
  let cipherTextHexStr = CryptoJS.enc.Hex.parse(cipherText)
  let cipherTextBase64Str = CryptoJS.enc.Base64.stringify(cipherTextHexStr)

  let key = KEY
  let iv = KEY
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }

  console.log('key:' + key)
  console.log('iv:' + iv)

  var decrypt = CryptoJS.AES.decrypt(cipherTextBase64Str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)

  return decryptedStr

}

export function GenerateKey() {
  const uuidstr = (Math.random() * 10000000).toString(16).substr(0, 4) + (new Date()).getTime() + Math.random().toString().substr(2, 5)
  return uuidstr
}

export function GenerateRandomString16() {
  let x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
  let tmp = "";
  let timestamp = new Date().getTime();
  for (let i = 0; i < 16; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
  }
  // return timestamp + tmp;
  return tmp;
}



//加密方法
export function RSAencrypt(content, publicKey) {
  //实例化jsEncrypt对象
  let jse = new JSEncrypt();
  //设置公钥
  console.log(publicKey)
  jse.setPublicKey(publicKey);
  // console.log('加密：'+jse.encrypt(pas))

  console.log('加密的明文：'+content)
  const result = jse.encrypt(content);
  console.log('加密后的密文:'+result)
  return result
}

//解密方法
export function RSAdecrypt(content, privateKey) {
  let jse = new JSEncrypt();
  // 私钥
  jse.setPrivateKey(privateKey)
  // console.log('解密：'+jse.decrypt(pas))
  return jse.decrypt(content);
}
