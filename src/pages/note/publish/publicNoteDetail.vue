<template>
  <div>
    <Card>
      <p slot="title">{{note.title}}</p>
      <quill-editor v-model="note.content" :options="editorOption"></quill-editor>
      <div v-if="loginUser">
        <Form>
          <FormItem style="text-align: center">
            <Button type="primary" @click="btUpdateNote">{{$t('publicNote.btUpdate')}}</Button>
          </FormItem>
        </Form>
      </div>
    </Card>


  </div>
</template>

<script>
    import {apiGetPublicNoteByNoteId} from "../../../api/api";
    import {quillEditor} from 'vue-quill-editor'

    export default {
        name: "publicNoteDetail",
        components: {
            quillEditor,
        },
        data() {
            return {
                noteId: '',
                note: {},
                editorOption: {
                    theme: 'bubble',
                    modules: {
                        toolbar: null
                    }
                }
            }
        },
        computed: {
            loginUser() {
                if (this.$store.state.gogo_token) {
                    return true
                }
                return false
            }
        },
        methods: {
            loadAllData() {
                if (this.$route.query.noteId) {
                    this.noteId = this.$route.query.noteId
                    apiGetPublicNoteByNoteId(this.noteId).then((response) => {
                        if (response.data.code === 0) {
                            this.note = response.data.data.note
                        }
                    })
                }
            },
            btUpdateNote() {
                this.$router.push({
                    name: 'editPublicNote',
                    params: {
                        noteId: this.note.noteId
                    }
                })
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
