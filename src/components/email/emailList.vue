<template>
  <div>
    <email-row v-for="(item, index) in emailList"
               :key="index"
               :email="item">
    </email-row>
    <Button type="primary" @click="onShowEmailModal">add</Button>

    <Modal
      :closable="false"
      v-model="emailModal"
      @on-ok="onOk"
      @on-cancel="onCancel">
      <Input v-model="email" :placeholder="$t('email.emailHolder')"></Input>
    </Modal>
  </div>
</template>

<script>
  import emailRow from './emailRow'

  export default {
    name: "emailList",
    components: {
      emailRow
    },
    data() {
      return {
        emailModal: false,
        email: ''
      }
    },
    props: {
      emailList: Array
    },
    methods: {
      onShowEmailModal() {
        this.emailModal = true
      },
      onOk() {
        //新增一个email
        console.log(this.email)
        console.log(this.$store.state.recipient_id)
      },
      onCancel() {

      }
    }
  }
</script>

<style scoped>

</style>
