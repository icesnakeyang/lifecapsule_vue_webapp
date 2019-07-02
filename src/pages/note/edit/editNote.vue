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
  import {apiGetNote} from "@/api/api";
  import {apiEditNote} from "@/api/api";
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.snow.css'
  import {imageResize} from 'quill-image-resize-module'
  import {Decrypt, Encrypt, GenerateKey, RSAencrypt, GenerateRandomString16} from "../../../plugins/crypto";
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

            const rsaEncryptAESkey = RSAencrypt(keyAES_1, response.data.data.publicKey)

            params.encryptKey = rsaEncryptAESkey
            params.keyToken = response.data.data.keyToken

            apiGetNote(params).then((response) => {
              if (response.data.code === 0) {

                this.note = response.data.data.note
                console.log(this.note.userEncodeKey)
                console.log(keyAES_1)
                const aes1 = Decrypt(this.note.userEncodeKey, keyAES_1, keyAES_1)
                this.note.detail = Decrypt(this.note.detail, aes1, aes1)
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
