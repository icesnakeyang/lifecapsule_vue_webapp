<template>
  <div>
    <div>
      <Form>
        <FormItem>
          <Input v-model="note.title"></Input>
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
            <Button type="primary" @click="onPublish" class="gogo_button">{{$t('publicNote.publish')}}</Button>
          </FormItem>
        </span>
      </Form>
    </div>
  </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.bubble.css'
    import 'quill/dist/quill.snow.css'
    import {apiPublishNote} from "../../../api/api";

    export default {
        name: "editNote",
        components: {
            quillEditor,
        },
        data() {
            return {
                note: {
                    title: '',
                    detail: ''
                },
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
                this.note.title = this.$store.state.note_title
                this.note.detail = this.$store.state.note_detail
            },

            onPublish() {
                this.$Modal.confirm({
                    title: this.$t('publicNote.confirmTip'),
                    content: this.$t('publicNote.tip1'),
                    onOk: () => {
                        apiPublishNote({
                            noteId: this.$store.state.note_id,
                            title: this.$store.state.note_title,
                            content: this.$store.state.note_detail
                        }).then((response) => {
                            if (response.data.code === 0) {
                                this.$Message.info(this.$t('publicNote.publishSuccess'))
                            } else {
                                this.$Message.error(this.$t('publicNote.publishFailed'))
                            }
                        })
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
