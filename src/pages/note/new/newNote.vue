<template>
  <div>
    <div>
      <Form>
        <FormItem>
          <Input v-model="title" :placeholder="$t('note.titleHolder')"></Input>
        </FormItem>
      </Form>
      <quill-editor v-model="noteContent"
                    :options="editorOption"></quill-editor>
    </div>
    <div>
      <Button type="primary" @click="onSave">{{$t('note.btSave')}}</Button>
    </div>
  </div>
</template>

<script>
  import {apiAddNote} from "@/api/api";
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.snow.css'
  import {imageResize} from 'quill-image-resize-module'
  import {Decrypt, Encrypt} from "../../../plugins/crypto";

  export default {
    name: "newNote",
    components: {
      quillEditor
    },
    data() {
      return {
        title: '',
        noteContent: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['image', 'video']
            ],
            imageResize: true
          }
        }
      }
    },
    methods: {
      onSave() {
        console.log(this.title)
        console.log(this.noteContent)

        apiAddNote({
          title: this.title,
          detail: Encrypt(this.noteContent),
          categoryId: this.$store.state.category_id
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.$Message.info('Save successful')
            this.$router.push({
              name: 'notelist'
            })
          } else {
            this.$Message.error('Save failed')
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
