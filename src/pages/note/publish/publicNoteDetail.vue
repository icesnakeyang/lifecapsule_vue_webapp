<template>
  <div>
    <div>{{note.title}}</div>
    <quill-editor v-model="note.content" :options="editorOption"></quill-editor>
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
        methods: {
            loadAllData() {
                if (this.$route.query.noteId) {
                    this.noteId = this.$route.query.noteId
                    apiGetPublicNoteByNoteId(this.noteId).then((response) => {
                        console.log(response)
                        if (response.data.code === 0) {
                            this.note = response.data.data.note
                        }
                    })
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
