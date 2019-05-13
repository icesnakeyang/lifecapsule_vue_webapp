<template>
  <div>
    <div>
      <Form>
        <FormItem>
          <Input v-model="note.title" placeholder="Title"></Input>
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
            <Button type="primary" @click="onSave" class="gogo_button">Save</Button>
          </FormItem>
        </span>
      </Form>
    </div>
  </div>
</template>

<script>
  import {apiGetNote} from "@/api/api";
  import {apiEditNote} from "@/api/api";
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.snow.css'
  import {imageResize} from 'quill-image-resize-module'


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
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['image', 'video']
            ],
            imageResize: true
          }
        },
        saving: false
      }
    },
    methods: {
      loadAllData() {
        const params = {
          noteId: this.$store.state.note_id,
        }
        console.log(params)
        apiGetNote(params).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.note = response.data.data.note
          }
        })
      },

      onSave() {
        this.saving = true
        apiEditNote({
          noteId: this.note.noteId,
          title: this.note.title,
          detail: this.note.detail,
          token: this.$store.state.gogo_token
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.$Message.info('Save successful')
            // this.$router.push({
            //   name: 'notelist'
            // })
            this.saving = false
          } else {
            this.$Message.error('Save failed')
            this.saving = false
          }
        }).catch((error) => {
          console.log(error)
          this.saving = false
        })
      }
    },

    mounted() {
      if (this.$route.params.noteId) {
        console.log(this.$route.params.noteId)
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
