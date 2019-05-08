<template>
  <div>
    <recipient v-for="(item, index) in recipientList"
               :key="index"
               :recipient="item"></recipient>
    <Button class="gogo_button" @click="onAdd">Add</Button>
  </div>
</template>

<script>
  import {apiListRecipientByNoteId} from "@/api/api";
  import Recipient from './recipient'

  export default {
    name: "recipientList",
    components: {
      Recipient
    },
    data() {
      return {
        recipientList: []
      }
    },
    methods: {
      loadAllData() {
        apiListRecipientByNoteId({
          noteId: this.$store.state.note_id
        }).then((response) => {
          console.log(response.data.data.recipientList)
          this.recipientList = response.data.data.recipientList
          console.log(this.recipientList)
        })
      },
      onAdd() {
        this.$router.push({
          name: 'recipient'
        })
      }
    },
    mounted() {
      console.log(this.$store.state.note_id)
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
