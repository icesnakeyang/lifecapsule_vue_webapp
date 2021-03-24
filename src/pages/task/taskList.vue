<template>
  <div>
    <Card class="card">
      <p slot="title">
        我的任务
      </p>

    </Card>
    <Card class="card">
      <Table :data="tasks" :columns="taskTable"></Table>
      <div style="margin: 20px 0">
        <Page :total="totalTasks" @on-change="onTaskPage"/>
      </div>
    </Card>
  </div>
</template>

<script>
import {apiDeleteTask, apiListTask} from "../../api/api";
import moment from "moment";

export default {
  name: "taskList",
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      tasks: [],
      taskTable: [
        {
          title: '任务标题',
          key: 'taskTitle'
        },
        {
          title: '创建时间',
          render: (h, params) => {
            return h('div', moment(params.row.createTime).format('YYYY-MM-DD HH:mm'))
          }
        },
        {
          title: '任务类型',
          render: (h, params) => {
            return h('div', this.taskType(params.row.taskType))
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(params.row.taskId)
                    this.$router.push({
                      name: 'taskDetail',
                      params: {
                        taskId: params.row.taskId
                      }
                    })
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeTask(params.row)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      totalTasks: 0
    }
  },
  methods: {
    loadAllData() {
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        odc: true
      }
      apiListTask(params).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.tasks = res.data.data.tasks
          this.totalTasks = res.data.data.totalTasks
        }
      })
    },

    onTaskPage(e) {
      this.pageIndex = e
      this.loadAllData()
    },

    taskType(e) {
      console.log(e)
      if (e === 'DEFAULT') {
        return '默认'
      }
      if (e === 'ACTION_10_SEC') {
        return '行动笔记'
      }
    },

    removeTask(e) {
      console.log(e)
      this.$Modal.confirm({
        content: '确认要删除该任务吗？',
        onOk: () => {
          let params = {
            taskId: e.taskId
          }
          apiDeleteTask(params).then((res) => {
            console.log(res)
            if (res.data.code === 0) {
              this.$Message.success("删除成功")
              this.loadAllData()
            } else {
              this.$Message.error(this.$t('syserr.' + res.data.code))
            }
          }).catch(() => {
            this.$Message.error(this.$t('syserr.10001'))
          })
        },
      });
    }
  },
  mounted() {
    this.loadAllData()
  }
}
</script>

<style scoped>
.card {
  margin: 20px
}
</style>
