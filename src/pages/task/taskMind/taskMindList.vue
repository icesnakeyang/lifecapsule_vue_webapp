<template>
  <div>
    <Card class="card">
      <p slot="title">
        我的主线任务
      </p>

    </Card>
    <Card class="card">
      <Table :data="taskList" :columns="taskTable"></Table>
      <div style="margin: 20px 0">
        <Page :total="totalTask" @on-change="onTaskPage"/>
      </div>
    </Card>
  </div>
</template>

<script>
import {apiDeleteTask, apiListTask} from "../../../api/api";
import moment from "moment";

export default {
  name: "taskMindList",
  data() {
    return {
      pageIndex: 1,
      pageSize: 20,
      taskList: [],
      totalTask: 0,
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
                    this.$store.dispatch('saveTaskId', params.row.taskId)
                    this.$router.push({
                      name: 'taskMindDetail'
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
    }
  },
  methods: {
    loadAllData() {
      let params = {
        taskType: 'TASK_MIND',
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      apiListTask(params).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.taskList = res.data.data.tasks
          this.totalTask = res.data.data.totalTasks
        }
      })
    },
    onTaskPage(e){
      this.pageIndex=e
      this.loadAllData()
    },
    removeTask(e){
      this.$Modal.confirm({
        content: '确认要删除该任务吗？',
        onOk: () => {
          let params={
            taskId:e.taskId
          }
          apiDeleteTask(params).then((res)=>{
            console.log(res)
            if(res.data.code===0){
              this.$Message.success("删除成功")
              this.loadAllData()
            }else{
              this.$Message.error(this.$t('syserr.'+res.data.code))
            }
          }).catch(()=>{
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

</style>
