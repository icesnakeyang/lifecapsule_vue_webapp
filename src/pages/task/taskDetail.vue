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
      <Button type="primary" @click="onEdit">编辑</Button>
    </Card>
  </div>
</template>

<script>
import {apiGetTask, apiRequestRSAPublicKey} from "../../api/api";
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
      taskId: null,
      task: {
        taskTitle: ''
      },
      noteContent: null,
      editorOption: {
        modules: {
          toolbar: null,
          imageResize: true
        }
      }
    }
  },
  computed: {
    createTime() {
      console.log(this.task.createTime)
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
      if (this.task.complete) {
        return true
      }
      return false
    }
  },
  methods: {
    loadAllData() {
      let params = {
        taskId: this.taskId
      }

      console.log(params)

      apiRequestRSAPublicKey().then((response) => {
        if (response.data.code === 0) {
          const keyAES_1 = GenerateRandomString16();
          params.encryptKey = RSAencrypt(keyAES_1, response.data.data.publicKey)
          params.keyToken = response.data.data.keyToken
          // apiGetTask(params).then((response) => {
          apiGetTask(params).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              this.task = response.data.data.task
              let strKey = this.task.userEncodeKey
              strKey = Decrypt2(strKey, keyAES_1)
              this.noteContent = Decrypt(response.data.data.noteContent, strKey, strKey)
            } else {
              this.$Message.error(this.$t('syserr.' + response.data.code))
            }
          }).catch((error) => {
            this.$Message.error(this.$t('syserr.10001'))
          })
        }
      })

      apiGetTask(params).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.task = res.data.data.task
          console.log(this.task)
        }
      })
    },
    onEdit() {
      console.log(this.taskId)
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
