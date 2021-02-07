<template>
  <div>
    <Form>
      <FormItem>
        <Input v-model="note.title" :placeholder="$t('note.btSave')"
               @on-change="onEditorChange1"
        ></Input>
      </FormItem>
      <FormItem>
        <quill-editor v-model="note.content"
                      :options="editorOption"
                      @change="onEditorChange"
        ></quill-editor>
      </FormItem>
      <span v-if="saving">
          <Spin>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Saving</div>
          </Spin>
        </span>
      <span v-else>
        <div v-if="editing">
          <FormItem>
            <Button type="primary" @click="onSave" class="gogo_button">{{$t('common.btSave')}}</Button>
          </FormItem>
        </div>
      </span>
    </Form>
  </div>
</template>

<script>
    import {apiGetPublicNoteByNoteId, apiUpdatePublicNote} from "../../../api/api";
    import {quillEditor} from 'vue-quill-editor'

    export default {
        name: "editPublicNote",
        components: {
            quillEditor
        },
        data() {
            return {
                note: {},
                editorOption: {
                    modules: {
                        // toolbar: [
                        //   ['bold', 'italic', 'underline', 'strike'],
                        //   ['image', 'video']
                        // ],
                        imageResize: true
                    },
                    placeholder: this.$t('note.detailHolder')
                },
                saving: false,
                editing: false,
                keys: -1
            }
        },
        methods: {
            loadAllData() {
                apiGetPublicNoteByNoteId(this.$route.params.noteId).then((response) => {
                    if (response.data.code === 0) {
                        this.note = response.data.data.note
                    }
                })
            },
            onSave() {
                apiUpdatePublicNote({
                    noteId: this.note.noteId,
                    title: this.note.title,
                    content: this.note.content
                }).then((response) => {
                    if (response.data.code === 0) {
                        this.$Message.success(this.$t('publicNote.tipUpdateSuccess'))
                        this.saving = false
                        this.editing = false
                        this.keys = 0
                    } else {
                        throw new Error(this.$t('publicNote.tipUpdateFailed'))
                        this.saving = false
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                    this.saving = false
                })
            },
            onEditorChange() {
                this.keys++;
                if (this.keys > 0) {
                    this.editing = true
                }
            },
            onEditorChange1(){
                this.keys++;
                if (this.keys > 0) {
                    this.editing = true
                }
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
