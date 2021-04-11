<template>
  <div>
    <div>
      <Form>
        <FormItem>
          <Input v-model="title" :placeholder="$t('note.titleHolder')"></Input>
        </FormItem>
      </Form>
      <quill-editor v-model="noteContent"
                    :options="editorOption"></quill-editor>
    </div>
    <div class="bt_view">
      <div v-if="saving">
        <Button type="primary" loading>{{$t('note.btSave')}}</Button>
      </div>
      <div v-else>
        <Button type="primary" @click="onSave">{{$t('note.btSave')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import {apiAddNote} from "@/api/api";
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.snow.css'
  import {imageResize} from 'quill-image-resize-module'
  import {Encrypt, GenerateKey, RSAencrypt} from "../../../plugins/crypto";
  import {apiRequestRSAPublicKey} from "../../../api/api";
  import CryptoJS from 'crypto-js'

  export default {
    name: "newNote",
    components: {
      quillEditor
    },
    data() {
      return {
        title: '',
        noteContent: '',
        editorOption: {
          modules: {
            // toolbar: [
              // ['bold', 'italic', 'underline', 'strike'],
              // ['image', 'video']
            // ],
            imageResize: true
          },
          placeholder: this.$t('note.detailHolder'),
        },
        saving:false
      }
    },
    methods: {
      onSave() {
        /**
         * 参数：
         * uuid，keyAES，keyAESBase64
         * 首先生成一个UUID，然后把该UUID进行SHA256加密，获得一个key，然后再进行base64编码，得到一个准备好的私钥
         * 用这个AES的私钥来加密笔记内容，得到加密了的笔记detail
         */
        this.saving=true
        const uuid = GenerateKey()
        const keyAES = CryptoJS.SHA256(uuid)
        const keyAESBase64 = CryptoJS.enc.Base64.stringify(keyAES)
        let params = {
          title: this.title,
          detail: Encrypt(this.noteContent, keyAESBase64, keyAESBase64),
          encryptKey: keyAESBase64,
          categoryId: this.$store.state.category_id,
        }
        /**
         * 向API请求一个公钥，得到公钥和公钥的token
         */
        apiRequestRSAPublicKey().then((response) => {
          if (response.data.code === 0) {
            /**
             * 用请求到的公钥来加密AES私钥
             */
            params.encryptKey = RSAencrypt(params.encryptKey, response.data.data.publicKey)
            params.keyToken = response.data.data.keyToken

            this.saving = true
            /**
             * 加密保存笔记
             * 把加密好的笔记内容，AES私钥，请求的公钥token作为参数提交给Api
             */
            apiAddNote(params).then((response) => {
              if (response.data.code === 0) {
                this.$Message.info(this.$t('common.btSaveSuccess'))
                this.$router.push({
                  name: 'notelist'
                })
              } else {
                this.$Message.error(this.$t('common.btSaveFailed'))
              }
              this.saving=false
            }).catch((error) => {
              this.saving=false
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
.bt_view{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
</style>
