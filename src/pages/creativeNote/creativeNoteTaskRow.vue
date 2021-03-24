<template>
  <div class="task_view">
    <div class="task_check_view">
      <Checkbox v-model="theData.item.complete"
                @on-change="onStatusChange"
                size="large">{{ complete }}</Checkbox>
    </div>
    <div class="task_title_view">
      <div class="complete" v-if="theData.item.complete">
        {{ theData.item.taskTitle }}
      </div>
      <div class="un_complete" v-else>
        {{ theData.item.taskTitle }}
      </div>
    </div>
    <div class="task_bt_view">
      <Button type="info" size="small" @click="onOpenTaskModal">修改</Button>
      <Button type="error" size="small" @click="onDeleteTask">删除</Button>
    </div>
    <Modal
      :mask-closable="false"
      v-model="modalTask"
      title="修改任务标题"
      @on-ok="onConfirmUpdateTask">
      <FormItem>
        <Input v-model="modalTaskTitle"/>
      </FormItem>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "creativeNoteTaskRow",
  data() {
    return {
      modalTask: false,
      modalTaskTitle: ''
    }
  },
  props: ['theData'],
  computed: {
    complete() {
      console.log(this.theData)
      return ''
    }
  },
  methods: {
    onDeleteTask() {
      let data = {
        item: this.theData.item,
        index: this.theData.index
      }
      this.$emit('onDeleteTask', data);
    },
    onOpenTaskModal() {
      this.modalTaskTitle=this.theData.item.taskTitle
      this.modalTask = true
    },
    onConfirmUpdateTask() {
      this.theData.item.taskTitle = this.modalTaskTitle
      let data = {
        item: this.theData.item,
        index: this.theData.index
      }
      this.$emit('onUpdateTask', data)
    },
    onStatusChange(){
      console.log(this.theData.item.complete)
      let data={
        item:this.theData.item,
        index:this.theData.index
      }
      this.$emit('onUpdateTask', data)
    }
  }
}
</script>

<style scoped>
.un_complete {
  color: #ff8100;
  font-weight: bold;
}

.complete {
  color: #8b8989;
  text-decoration: line-through
}

.task_view {
  display: flex;
  margin-top: 0px;
}

.task_check_view {
  width: 50px;
}

.task_title_view {
  width: 100%;
}

.task_bt_view {
  width: 100px;
  display: flex;
}
</style>
