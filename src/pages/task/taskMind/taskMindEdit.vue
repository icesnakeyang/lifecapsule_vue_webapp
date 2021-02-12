<template>
  <div>
    <Card>
      <p slot="title">
        修改使命任务
      </p>
      <Form>
        <FormItem label="任务标题">
          <Input v-model="task.taskTitle" @on-change="onTitleChange"/>
        </FormItem>

        <div>
          <div>任务内容</div>
          <quill-editor v-model="noteContent"
                        :options="editorOption"
                        @change="onEditorChange"
          ></quill-editor>
        </div>
      </Form>
      <div v-if="editing">
        <div v-if="saving">
          <Button type="primary" loading>保存中....</Button>
        </div>
        <div v-else>
          <Button type="primary" @click="onUpdateTask">修改任务s</Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import {apiGetTask, apiUpdateTask} from "../../../api/api";
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import {apiCreateTask, apiRequestRSAPublicKey} from "../../../api/api";
import {Decrypt, Decrypt2, Encrypt, GenerateKey, GenerateRandomString16, RSAencrypt} from "../../../plugins/crypto";
import CryptoJS from "crypto-js";

export default {
  name: "taskMindEdit",
  components: {
    quillEditor
  },
  data() {
    return {
      taskId: null,
      task: {
        taskTitle: ''
      },
      noteContent: null,
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{
              list: 'ordered'
            },
              {
                list: 'bullet'
              }],
            [
              {
                color: []
              },
              {
                background: []
              }
            ],
            [
              {
                align: []
              }
            ],
            [
              {
                header: [1, 2, 3, 4, 5, 6, false]
              }
            ]
          ],
          imageResize: true
        },
        placeholder: this.$t('note.detailHolder')
      },
      saving: false,
      keys: -1,
      editing: false
    }
  },
  methods: {
    loadAllData() {
      let params = {
        taskId: this.taskId
      }

      apiRequestRSAPublicKey().then((response) => {
        if (response.data.code === 0) {
          const keyAES_1 = GenerateRandomString16();
          params.encryptKey = RSAencrypt(keyAES_1, response.data.data.publicKey)
          params.keyToken = response.data.data.keyToken
          apiGetTask(params).then((response) => {
            if (response.data.code === 0) {
              this.task = response.data.data.task
              let strKey = this.task.userEncodeKey
              strKey = Decrypt2(strKey, keyAES_1)
              this.noteContent = Decrypt(response.data.data.noteContent, strKey, strKey)
            }
          })
        } else {
          this.$Message.error('读取数据失败')
        }
      }).catch(() => {
        this.$Message.error('读取数据失败')
      })
    },
    onUpdateTask() {
      this.saving = true
      /**
       * 本地随机生成一个uuid作为钥匙：key_UUID
       */
      const key_UUID = GenerateKey()
      /**
       * 把这个key_UUID用SHA256算法转换成哈希值：key_UUID_256
       */
      const key_UUID_256 = CryptoJS.SHA256(key_UUID);
      /**
       * 把这个key_UUID_256转成base64格式
       */
      const key_UUID_256_base64 = CryptoJS.enc.Base64.stringify(key_UUID_256)

      let params = {
        taskId:this.task.taskId,
        title: this.task.taskTitle,
        /**
         * 用这个key_UUID_256_base64作为秘钥和补码，用AES算法加密笔记内容
         */
        content: Encrypt(this.noteContent, key_UUID_256_base64, key_UUID_256_base64),
        /**
         * key_UUID_256_base64秘钥需要保存到服务器上
         */
        encryptKey: key_UUID_256_base64
      }

      /**
       * 从服务器请求一个RSA公钥
       */
      apiRequestRSAPublicKey().then((response) => {
        if (response.data.code === 0) {
          /**
           * 用服务器生成的RSA公钥来加密本地的AES秘钥key_UUID_256_base64
           */
          params.encryptKey = RSAencrypt(params.encryptKey, response.data.data.publicKey)
          /**
           * 服务器端的RSA私钥对应的token
           */
          params.keyToken = response.data.data.keyToken

          apiUpdateTask(params).then((response) => {
            if (response.data.code === 0) {
              this.$Message.info(this.$t('common.btSaveSuccess'))
              this.$router.push({
                name:'taskMindDetail'
              })
            } else {
              this.$Message.error(this.$t('common.btSaveFailed'))
            }
            this.saving = false
          }).catch((error) => {
            this.$Message.error(this.$t('syserr.10001'))
            this.saving = false
          })
        }
      })
    },

    onEditorChange() {
      console.log(this.keys)
      this.keys++
      if (this.keys > 0) {
        this.editing = true
      }
    },
    onTitleChange() {
      console.log(this.keys)
      this.keys++
      this.editing = true
    }
  },
  mounted() {
    if (this.$store.state.task_id) {
      this.taskId = this.$store.state.task_id
    }
    this.loadAllData()
  }
}
</script>

<style scoped>

</style>
