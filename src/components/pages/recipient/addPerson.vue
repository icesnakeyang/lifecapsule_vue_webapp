<template>
  <div>
    <Form>
      <FormItem>
        <Input type="text" v-model="name" placeholder="name"></Input>
      </FormItem>
      <FormItem>
        <Input type="text" v-model="email" placeholder="email"></Input>
      </FormItem>
      <FormItem>
        <Input type="text" v-model="phone" placeholder="phone"></Input>
      </FormItem>
      <FormItem>
        <Input type="text" v-model="address" placeholder="address"></Input>
      </FormItem>
      <FormItem>
        <quill-editor v-model="remark"
                      :options="editorOption"></quill-editor>
      </FormItem>
      <FormItem>
        <Button class="gogo_button" type="primary" @click="onSave">Submit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {apiCreateRecipientPerson} from "@/api/api";
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.snow.css'
  import {imageResize} from 'quill-image-resize-module'

  export default {
    name: "addPerson",
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
          placeholder: 'remark',
          theme: 'snow'
        },
        recipientId: null
      }
    },
    methods: {
      onSave() {
        apiCreateRecipientPerson({
          recipientId: this.$store.state.recipient_id,
          noteId: this.$store.state.note_id,
          personName: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address,
          remark: this.remark
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.$router.push({
              name: 'recipient',
              params: {
                recipientId: response.data.data.recipient.recipientId
              }
            })
          }
        })
      },
    },
    mounted() {
      console.log(this.$store.state.note_id)
      console.log(this.$store.state.recipient_id)
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
