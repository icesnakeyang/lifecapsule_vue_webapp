<template>
  <div>
    <Card>
      <p>{{ task.taskTitle }}</p>
      <p>创建时间：{{ createTime }}</p>
      <p>任务权重：{{ taskImportant }}</p>
      <p>任务类型：{{ taskType }}</p>
      <div v-if="complete">
        <Tag color="success">已完成</Tag>
      </div>
      <div v-else>
        <Tag color="blue">进行中</Tag>
      </div>
      <div>
        <div>任务内容</div>
        <quill-editor v-model="noteContent"
                      :options="editorOption"
        ></quill-editor>
      </div>
      <div v-if="saving">
        <Spin></Spin>
      </div>
      <div v-else>
        <div class="bt_view">
          <Button type="primary" @click="onEdit">编辑</Button>
          <div v-if="progress">
            <Button type="success" @click="onComplete">设置完成</Button>
          </div>
          <div v-if="complete">
            <Button type="primary" @click="onProgres">设置为进行中</Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import {apiCompleteTask, apiGetTask, apiRequestRSAPublicKey, apiSetTaskProgress} from "../../api/api";
import moment from "moment";
import {taskImportant, taskType} from "../../common/common";
import {Decrypt, Decrypt2, GenerateRandomString16, RSAencrypt} from "../../plugins/crypto";
import {quillEditor} from 'vue-quill-editor'

export default {
  name: "taskDetail",
  components: {
    quillEditor
  },
  data() {
    return {
      task: {
        taskTitle: ''
      },
      noteContent: null,
      editorOption: {
        modules: {
          toolbar: null,
          imageResize: true
        }
      },
      saving: false
    }
  },
  computed: {
    createTime() {
      if (this.task.createTime) {
        return moment(this.task.createTime).format('YYYY-MM-DD HH:mm')
      }
      return ''
    },
    taskImportant() {
      if (this.task.taskType) {
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
      if (this.task.status === 'COMPLETE') {
        return true
      }
      return false
    },
    progress() {
      console.log(this.task.status)
      if (this.task.status === 'PROGRESS') {
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
      apiRequestRSAPublicKey().then((response) => {
          console.log(response)
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
                    this.noteContent = Decrypt(response.data.data.noteContent, strKey, strKey)
                  }
                } else {
                  this.$Message.error(this.$t('syserr.' + response.data.code))
                }
              }
            ).catch((error) => {
              this.$Message.error(this.$t('syserr.10001'))
            })
          }
        }
      )
    },
    onEdit() {
      this.$router.push({
        name: 'taskEdit'
      })
    },
    onComplete() {
      let params = {
        taskId: this.$store.state.task_id
      }
      this.saving = true
      apiCompleteTask(params).then((res) => {
        if (res.data.code === 0) {
          this.loadAllData()
        } else {
          this.$Message.error(this.$t('syserr.' + response.data.code))
        }
        this.saving = false
      }).catch(() => {
        this.$Message.error(this.$t('syserr.10001'))
        this.saving = false
      })
    },
    onProgres() {
      let params = {
        taskId: this.$store.state.task_id
      }
      this.saving = true
      apiSetTaskProgress(params).then((res) => {
        if (res.data.code === 0) {
          this.loadAllData()
        } else {
          this.$Message.error(this.$t('syserr.' + response.data.code))
        }
        this.saving = false
      }).catch(() => {
        this.$Message.error(this.$t('syserr.10001'))
        this.saving = false
      })
    }
  },
  mounted() {
    if (this.$route.params.taskId) {
      this.$store.dispatch('saveTaskId', this.$route.params.taskId)
    }
    this.loadAllData()
  }
}
</script>

<style scoped>
.bt_view {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
</style>
