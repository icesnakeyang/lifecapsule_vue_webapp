<template>
<div>
  <Card>
    <p slot="title">
      修改使命任务
    </p>
    <Form>
      <FormItem label="任务标题">
        <Input v-model="task.title"/>
      </FormItem>

      <div>
        <div>任务内容</div>
        <quill-editor v-model="task.detail"
                      :options="editorOption"
        ></quill-editor>
      </div>
    </Form>
    <div v-if="saving">
      <Button type="primary" loading>保存中....</Button>
    </div>
    <div v-else>
      <Button type="primary" @click="onUpdateTask">创建任务</Button>
    </div>
  </Card>
</div>
</template>

<script>
import {apiGetTask} from "../../../api/api";
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import {apiCreateTask, apiRequestRSAPublicKey} from "../../../api/api";
import {Encrypt, GenerateKey, RSAencrypt} from "../../../plugins/crypto";
import CryptoJS from "crypto-js";

export default {
  name: "taskMindEdit",
  components:{
    quillEditor
  },
  data() {
    return {
      taskId: null,
      task:{},
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
      saving:false
    }
  },
  methods: {
    loadAllData() {
      let params = {
        taskId: this.taskId
      }
      apiGetTask(params).then((res) => {
        console.log(res)
        if(res.data.code===0){
          this.task=res.data.data.task
        }
      })
    },
    onUpdateTask(){
      console.log(this.task)
      this.saving=true
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
