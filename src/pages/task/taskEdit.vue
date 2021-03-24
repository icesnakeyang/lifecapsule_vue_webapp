<template>
  <div>
    <div v-if="loading">
      <Spin/>
    </div>
    <div v-else>
      <Card>
        <Form>
          <FormItem label="任务标题">
            <Input v-model="task.taskTitle"/>
          </FormItem>
          <FormItem label="任务权重">
            <RadioGroup v-model="task.important" button-style="solid"
                        size="small"
                        :vertical="true"
                        @on-change="onImportant">
              <Radio label="IMPORTANT_AND_URGENT">
                <span>重要又紧急</span>
                <span class="important_and_urgent" v-if="IMPORTANT_AND_URGENT">
                <span style="color: red">重要又紧急的事情立刻做</span>
              </span>
              </Radio>
              <Radio label="IMPORTANT_NOT_URGENT">
                <span>重要不紧急</span>
                <span class="important_not_urgent" v-if="IMPORTANT_NOT_URGENT">
                <span>重要不紧急的事情优先做</span>
              </span>
              </Radio>
              <Radio label="URGENT_NOT_IMPORTANT">
                <span>紧急不重要</span>
                <span class="urgent_not_important" v-if="URGENT_NOT_IMPORTANT">
                <span>紧急但不重要的事情让别人去做吧</span>
              </span>
              </Radio>
              <Radio label="NOTHING">
                <span>不重要不紧急</span>
                <span class="nothing" v-if="NOTHING">
                <span style="color: darkgray">不重要又不紧急的事情就别浪费时间做了</span>
              </span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <div>
            <div>任务内容</div>
            <quill-editor v-model="taskContent"
                          :options="editorOption"
            ></quill-editor>
          </div>
        </Form>
        <div v-if="saving">
          <Button type="primary" loading>保存中...</Button>
        </div>
        <div v-else>
          <Button type="primary" @click="onSave">保存修改</Button>
        </div>

      </Card>
    </div>
  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'
import {apiGetTask, apiRequestRSAPublicKey, apiUpdateTask} from "../../api/api";
import {Decrypt, Decrypt2, Encrypt, GenerateKey, GenerateRandomString16, RSAencrypt} from "../../plugins/crypto";
import moment from 'moment'
import {taskImportant, taskType} from "../../common/common";
import CryptoJS from "crypto-js";

export default {
  name: "taskEdit",
  components: {
    quillEditor
  },
  data() {
    return {
      task: {},
      taskContent: null,
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
      loading: true,
      saving: false
    }
  },
  computed: {
    createTime() {
      return moment(this.task.createTime).format('YYYY-MM-DD HH:mm')
    },
    taskImportant() {
      if (this.task.important) {
        return taskImportant(this.task.important)
      }
      return ''
    },
    taskType() {
      if (this.task.taskType) {
        return taskType(this.task.taskType)
      }
      return ''
    },
    complete() {
      if (this.task.complete) {
        return true
      }
      return false
    },
    IMPORTANT_AND_URGENT() {
      if (this.task.important && this.task.important === 'IMPORTANT_AND_URGENT') {
        return true
      }
      return false
    },
    IMPORTANT_NOT_URGENT() {
      if (this.task.important && this.task.important === 'IMPORTANT_NOT_URGENT') {
        return true
      }
      return false
    },
    URGENT_NOT_IMPORTANT() {
      if (this.task.important && this.task.important === 'URGENT_NOT_IMPORTANT') {
        return true
      }
      return false
    },
    NOTHING() {
      if (this.task.important && this.task.important === 'NOTHING') {
        return true
      }
      return false
    }
  },
  methods: {
    loadAllData() {
      let params = {
        taskId: this.$store.state.task_id
      }
      this.loading = true
      apiRequestRSAPublicKey().then((response) => {
          if (response.data.code === 0) {
            const keyAES_1 = GenerateRandomString16();
            params.encryptKey = RSAencrypt(keyAES_1, response.data.data.publicKey)
            params.keyToken = response.data.data.keyToken
            apiGetTask(params).then((response) => {
              if (response.data.code === 0) {
                this.task = response.data.data.task
                console.log(this.task)
                let strKey = this.task.userEncodeKey
                if (strKey) {
                  strKey = Decrypt2(strKey, keyAES_1)
                  this.taskContent = Decrypt(response.data.data.noteContent, strKey, strKey)
                }
              } else {
                this.$Message.error(this.$t('syserr.' + response.data.code))
              }
              this.loading = false
            }).catch((error) => {
              this.$Message.error(this.$t('syserr.10001'))
              this.loading = false
            })
          }
        }
      )
    },
    onImportant(e) {
      console.log(e)
      console.log(this.task.important)
    },
    onSave() {
      let params = {
        taskId: this.$store.state.task_id,
        title: this.task.taskTitle,
        important: this.task.important
      }
      console.log(params)
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

      /**
       * 用这个key_UUID_256_base64作为秘钥和补码，用AES算法加密笔记内容
       */
      params.content = Encrypt(this.taskContent, key_UUID_256_base64, key_UUID_256_base64),
        /**
         * key_UUID_256_base64秘钥需要保存到服务器上
         */
        params.encryptKey = key_UUID_256_base64

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
                name: 'taskDetail'
              })
            } else {
              this.$Message.error(this.$t('common.btSaveFailed'))
            }
            this.saving = false
          }).catch(() => {
            this.$Message.error(this.$t('syserr.10001'))
            this.saving = false
          })
        }
      })
    }
  }
  ,
  mounted() {
    this.loadAllData()
  }
}
</script>

<style scoped>

</style>
