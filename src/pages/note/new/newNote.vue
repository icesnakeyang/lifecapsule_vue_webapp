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
    <div style="margin-top: 20px">
      <Button type="primary" @click="onSave">{{$t('note.btSave')}}</Button>
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
        }
      }
    },
    methods: {
      onSave() {
        const uuid = GenerateKey()
        const keyAES = CryptoJS.SHA256(uuid)
        const keyAESBase64 = CryptoJS.enc.Base64.stringify(keyAES)
        let params = {
          title: this.title,
          detail: Encrypt(this.noteContent, keyAESBase64, keyAESBase64),
          encryptKey: keyAESBase64,
          categoryId: this.$store.state.category_id,
        }
        apiRequestRSAPublicKey().then((response) => {
          if (response.data.code === 0) {
            params.encryptKey = RSAencrypt(params.encryptKey, response.data.data.publicKey)
            params.keyToken = response.data.data.keyToken

            this.saving = true
            apiAddNote(params).then((response) => {
              if (response.data.code === 0) {
                this.$Message.info(this.$t('common.btSaveSuccess'))
                this.$router.push({
                  name: 'notelist'
                })
              } else {
                this.$Message.error(this.$t('common.btSaveFailed'))
              }
            }).catch((error) => {
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
