<template>
  <div>
    <Form>
      <FormItem :label="$t('recipient.name')">
        <Input type="text" v-model="name"></Input>
      </FormItem>
      <FormItem :label="$t('recipient.email')">
        <Input type="text" v-model="email"></Input>
      </FormItem>
      <FormItem :label="$t('recipient.phone')">
        <Input type="text" v-model="phone"></Input>
      </FormItem>
      <FormItem :label="$t('recipient.address')">
        <Input type="text" v-model="address"></Input>
      </FormItem>
      <FormItem>
        <span>
          <quill-editor v-model="remark"
                        :options="editorOption"></quill-editor>
        </span>
      </FormItem>
      <FormItem>
        <Button class="gogo_button" type="primary" @click="onSave">{{$t('common.btSave')}}</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {apiCreateRecipient} from "../../../api/api";
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.snow.css'
  import {imageResize} from 'quill-image-resize-module'

  export default {
    name: "addRecipient",
    components: {
      quillEditor
    },
    data() {
      return {
        name: '',
        email: '',
        phone: '',
        address: '',
        remark: '',
        editorOption: {
          modules: {
            toolbar: null,
            imageResize: true
          },
          placeholder: this.$t('recipient.remark'),
          theme: 'snow'
        },
        recipientId: null
      }
    },
    methods: {
      onSave() {
        const params = {
          triggerId: this.$store.state.trigger_id,
          noteId: this.$store.state.note_id,
          recipientName: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address,
          remark: this.remark,
          triggerName: this.$store.state.trigger_name,
          triggerRemark: this.$store.state.trigger_remark
        }
        apiCreateRecipient(params).then((response) => {
          if (response.data.code === 0) {
            this.$router.push({
              name: 'editTrigger',
              params: {
                triggerId: response.data.data.trigger.triggerId
              }
            })
          } else {
            this.$Message.error(this.$t('syserr.' + response.data.code))
          }
        })
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
