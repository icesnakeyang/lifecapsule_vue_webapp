<template>
  <div>
    <div>
      <Form>
        <FormItem>
          <Input v-model="note.title" placeholder="Title"></Input>
        </FormItem>
        <FormItem>
          <quill-editor v-model="note.detail"
                        :options="editorOption"></quill-editor>
        </FormItem>
        <span v-if="saving">
          <Spin>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Saving</div>
          </Spin>
        </span>
        <span v-else>
          <FormItem>
            <Button type="primary" @click="onSave" class="gogo_button">Save</Button>
          </FormItem>
        </span>
      </Form>
    </div>
  </div>
</template>

<script>
  import {apiEditNote, apiGetNote} from "@/api/api";
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.snow.css'
  import {Decrypt, DecryptAES, Encrypt, GenerateKey, GenerateRandomString16, RSAencrypt} from "../../../plugins/crypto";
  import {apiRequestRSAPublicKey} from "../../../api/api";

  import CryptoJS from 'crypto-js'

  export default {
    name: "editNote",
    components: {
      quillEditor,
    },
    data() {
      return {
        note: {},
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['image', 'video']
            ],
            imageResize: true
          }
        },
        saving: false
      }
    },
    methods: {
      loadAllData() {
        let params = {
          noteId: this.$store.state.note_id,
        }


        // let key = "2l49lstcupu81upx"
        // params.encryptKey = key
        // key = CryptoJS.enc.Utf8.parse("2l49lstcupu81upx");
        // let key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");

        // console.log('key1:' + key)
        // let key = GenerateRandomString16()
        // params.encryptKey = key
        // console.log('key2:' + key)
        // key = CryptoJS.enc.Utf8.parse(key)
        // console.log('key3:' + key)

        // let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});


        /**
         * 请求一个RSA公钥
         * 生成一个AES秘钥
         * 用RSA公钥加密AES秘钥，发送到服务器
         * 服务器用私钥解密AES，加密note的AES，发送回前端
         * 前端用AES解开note的AES
         * 用解开的note的AES解开detail
         *
         */

        apiRequestRSAPublicKey().then((response) => {
          if (response.data.code === 0) {
            const keyAES_1 = GenerateRandomString16();
            console.log(keyAES_1)

            params.encryptKey = RSAencrypt(keyAES_1, response.data.data.publicKey)
            params.keyToken = response.data.data.keyToken

            apiGetNote(params).then((response) => {
              if (response.data.code === 0) {

                this.note = response.data.data.note
                console.log(keyAES_1)

                console.log(encodeURIComponent(this.note.userEncodeKey))
                let strKey = this.note.userEncodeKey
                console.log(encodeURIComponent(strKey))

                if (this.note.userEncodeKey === strKey) {
                  console.log("相等")
                } else {
                  console.log("不相等")
                }

                strKey = DecryptAES(strKey, keyAES_1)


                /**
                 * 对strKey进行AES解密
                 */
                console.log(strKey)
                console.log(encodeURIComponent(strKey))

                let strKey2 = "KGd66hoKjTf/K2/upxpvv2xJkCfIJBF5drXrbYmowBo="
                console.log(strKey2)
                console.log(typeof strKey)
                console.log(typeof strKey2)
                console.log(encodeURIComponent(strKey))
                console.log(encodeURIComponent(strKey2))
                if (strKey === strKey2) {
                  console.log(1)
                } else {
                  console.log(2)
                }
                // let decryptedStr = Decrypt("ff504db1690037bfa17569ab575d41f3", "KGd66hoKjTf/K2/upxpvv2xJkCfIJBF5drXrbYmowBo=", "KGd66hoKjTf/K2/upxpvv2xJkCfIJBF5drXrbYmowBo=")
                let decryptedStr = Decrypt("ff504db1690037bfa17569ab575d41f3", strKey, strKey)
                console.log(decryptedStr)


                // let encrypted = 'oSvEnvPP7cWVgmj5nYqBPZgOJ/UEBwQr5HRMhVBsO6elNgk+aAgZlJYXg+fRW94Y'
                let encrypted = strKey
                // let key = '6twpxnxaunl7wsnv'
                let key = keyAES_1
                console.log("encrypted=" + encrypted);

                // let decrypted=DecryptAES(encrypted, key)

                // var encrypted1 = CryptoJS.enc.Base64.parse(encrypted);
                // let decrypted = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Utf8.parse(key), {
                //   iv: CryptoJS.enc.Utf8.parse(key),
                //   mode: CryptoJS.mode.CBC,
                //   padding: CryptoJS.pad.NoPadding
                // });
                // decrypted = CryptoJS.enc.Utf8.stringify(decrypted);// 转换为 utf8 字符串
                // console.log("decrypted=" + decrypted);


                // function Encrypt(strKey){
                //   let srcs = CryptoJS.enc.Utf8.parse(word);
                //   let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
                //   return encrypted.ciphertext.toString().toUpperCase();
                // }

                // let encryptedHexStr = CryptoJS.enc.Hex.parse(strKey);
                // let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                // let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
                // let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);


                // let decryptedStr=CryptoJS.AES.decrypt(strKey,keyAES_1).toString(CryptoJS.enc.Utf8);
                // let decryptedStr = CryptoJS.AES.decrypt(strKey, decrypted).toString();

                // console.log(decryptedStr)

                // return
                //
                // var decrypt = CryptoJS.AES.decrypt(context, key, {
                //   iv: iv,
                //   mode: CryptoJS.mode.CBC,
                //   padding: CryptoJS.pad.Pkcs7
                // });
                // var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                // return decryptedStr.toString();

                // const aes1 = Decrypt(this.note.userEncodeKey, keyAES_1, keyAES_1)
                // console.log(decrypted)
                console.log(this.note.detail)
                const ddr = Decrypt(this.note.detail, strKey, strKey)
                console.log(ddr)
                console.log(decryptedStr)
                this.note.detail = ddr
                // this.note.detail = decryptedStr
              }
            })
          }
        })
      },

      onSave() {
        const uuid = GenerateKey()
        const keyAES = CryptoJS.SHA256(uuid);
        const keyAESBase64 = CryptoJS.enc.Base64.stringify(keyAES)
        console.log(keyAESBase64)

        let params = {
          noteId: this.note.noteId,
          title: this.note.title,
          detail: Encrypt(this.note.detail, keyAESBase64, keyAESBase64),
          encryptKey: keyAESBase64
        }

        const txtData = '杨超越，我爱你'

        let req = {}

        apiRequestRSAPublicKey().then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            console.log('save note')
            params.encryptKey = RSAencrypt(params.encryptKey, response.data.data.publicKey)
            params.keyToken = response.data.data.keyToken
            console.log(params)

            this.saving = true
            apiEditNote(params).then((response) => {
              console.log(response)
              if (response.data.code === 0) {
                this.$Message.info('Save successful')
                // this.$router.push({
                //   name: 'notelist'
                // })
                this.saving = false
              } else {
                this.$Message.error('Save failed')
                this.saving = false
              }
            }).catch((error) => {
              console.log(error)
              this.saving = false
            })

          }

        })
      }
    },

    mounted() {
      if (this.$route.params.noteId) {
        this.$store.dispatch('saveNoteId', this.$route.params.noteId)
      }
      this.loadAllData()
    }
  }
</script>

<style scoped>
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }

  .gogo_button {
    width: 100%;
  }
</style>
