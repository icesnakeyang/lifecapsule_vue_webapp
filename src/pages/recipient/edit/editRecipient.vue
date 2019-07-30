<template>
  <div>
    <Form>
      <FormItem :label="$t('recipient.name')">
        <Input v-model="recipient.recipientName"></Input>
      </FormItem>
      <FormItem :label="$t('recipient.email')">
        <Input v-model="recipient.email"></Input>
      </FormItem>
      <FormItem :label="$t('recipient.phone')">
        <Input v-model="recipient.phone"></Input>
      </FormItem>
      <FormItem :label="$t('recipient.address')">
        <Input v-model="recipient.address"></Input>
      </FormItem>
      <FormItem>
        <quill-editor v-model="recipient.remark"
                      :options="editorOption"></quill-editor>
      </FormItem>
      <FormItem>
        <Button class="gogo_button" type="primary" @click="onSave">{{$t('common.btSave')}}</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {apiGetRecipientByRecipientId, apiUpdateRecipient} from "../../../api/api";
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.snow.css'

  export default {
    name: "editRecipient",
    components: {
      quillEditor
    },
    data() {
      return {
        recipient: {},
        editorOption: {
          modules: {
            toolbar: null,
            imageResize: true
          },
          placeholder: 'remark',
          theme: 'snow'
        }
      }
    },
    methods: {
      loadAllData() {
        apiGetRecipientByRecipientId({
          recipientId: this.$store.state.recipient_id
        }).then((response) => {
          if (response.data.code === 0) {
            this.recipient = response.data.data.recipient
          } else {
            this.$Message.error(this.$t('common.loadDataError'))
          }
        })
      },
      onSave() {
        apiUpdateRecipient({
          recipientId: this.recipient.recipientId,
          recipientName: this.recipient.recipientName,
          phone: this.recipient.phone,
          email: this.recipient.email,
          address: this.recipient.address,
          remark: this.recipient.remark
        }).then((response) => {
          if (response.data.code === 0) {
            this.$Message.success(this.$t('common.btSaveSuccess'))
          } else {
            this.$Message.error(this.$t('common.btSaveFailed'))
          }
        })
      }
    },
    mounted() {
      if (this.$route.params.recipientId) {
        this.$store.dispatch('saveRecipientId', this.$route.params.recipientId)
      }
      this.loadAllData()
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
