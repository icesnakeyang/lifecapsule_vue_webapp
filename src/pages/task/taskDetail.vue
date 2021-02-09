<template>
  <div>
    <Card>
      <p>{{ task.taskTitle }}</p>
      <p>创建时间：{{ createTime }}</p>
      <p>任务权重：{{ taskImportant }}</p>
      <p>任务类型：{{ taskType }}</p>
      <div v-if="complete">
        <Tag type="success">已完成</Tag>
      </div>
      <div v-else>
        <Tag type="info">进行中</Tag>
      </div>
    </Card>
  </div>
</template>

<script>
import {apiGetTask} from "../../api/api";
import moment from "moment";
import {taskImportant, taskType} from "../../common/common";

export default {
  name: "taskDetail",
  data() {
    return {
      taskId: null,
      task: {
        taskTitle: ''
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
      apiGetTask(params).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.task = res.data.data.task
          console.log(this.task)
        }
      })
    }
  },
  mounted() {
    this.taskId = this.$route.params.taskId
    this.loadAllData()
  }
}
</script>

<style scoped>

</style>
