<template>
  <div>
    <div>
      <Form>
        <FormItem>
          <Input v-model="note.title" :placeholder="$t('note.btSave')"></Input>
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
            <Button type="primary" @click="onSave" class="gogo_button">{{$t('common.btSave')}}</Button>
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
    import {Decrypt, Encrypt, GenerateKey, GenerateRandomString16, RSAencrypt, Decrypt2} from "../../../plugins/crypto";
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
                        // toolbar: [
                        //   ['bold', 'italic', 'underline', 'strike'],
                        //   ['image', 'video']
                        // ],
                        imageResize: true
                    },
                    placeholder: this.$t('note.detailHolder')
                },
                saving: false
            }
        },
        methods: {
            loadAllData() {
                let params = {
                    noteId: this.$store.state.note_id,
                }

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
                        params.encryptKey = RSAencrypt(keyAES_1, response.data.data.publicKey)
                        params.keyToken = response.data.data.keyToken
                        apiGetNote(params).then((response) => {
                            if (response.data.code === 0) {
                                this.note = response.data.data.note
                                let strKey = this.note.userEncodeKey
                                strKey = Decrypt2(strKey, keyAES_1)
                                this.note.detail = Decrypt(this.note.detail, strKey, strKey)
                                this.$store.dispatch('saveNoteTitle', this.note.title)
                                this.$store.dispatch('saveNoteDetail', this.note.detail)
                                console.log(this.$store.state.note_title)
                            }
                        })
                    }
                })
            },

            onSave() {
                const uuid = GenerateKey()
                const keyAES = CryptoJS.SHA256(uuid);
                const keyAESBase64 = CryptoJS.enc.Base64.stringify(keyAES)

                let params = {
                    noteId: this.note.noteId,
                    title: this.note.title,
                    detail: Encrypt(this.note.detail, keyAESBase64, keyAESBase64),
                    encryptKey: keyAESBase64
                }

                apiRequestRSAPublicKey().then((response) => {
                    if (response.data.code === 0) {
                        params.encryptKey = RSAencrypt(params.encryptKey, response.data.data.publicKey)
                        params.keyToken = response.data.data.keyToken

                        this.saving = true
                        apiEditNote(params).then((response) => {
                            if (response.data.code === 0) {
                                this.$Message.info(this.$t('common.btSaveSuccess'))
                                this.saving = false
                            } else {
                                this.$Message.error(this.$t('common.btSaveFailed'))
                                this.saving = false
                            }
                        }).catch((error) => {
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
