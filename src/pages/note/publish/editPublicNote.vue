<template>
  <div>
    <Form>
      <FormItem>
        <Input v-model="note.title" :placeholder="$t('note.btSave')"></Input>
      </FormItem>
      <FormItem>
        <quill-editor v-model="note.content"
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
            <Button type="primary" @click="onSave" class="gogo_button">{{$t('common.btSave')}}</Button>
          </FormItem>
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
                saving: false
            }
        },
        methods: {
            loadAllData() {
                console.log(this.$route.params.noteId)
                apiGetPublicNoteByNoteId(this.$route.params.noteId).then((response) => {
                    console.log(response)
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
                    console.log(response)
                    if (response.data.code === 0) {
                        this.$Message.success(this.$t('publicNote.tipUpdateSuccess'))
                    } else {
                        throw new Error(this.$t('publicNote.tipUpdateFailed'))
                    }
                }).catch((error) => {
                    this.$Message.error(error)
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
