<template>
  <div>
    <RecipientRow v-for="(item, index) in triggerList"
                  :key="index"
                  :trigger="item">
    </RecipientRow>
    <Button class="gogo_button" @click="onAdd">Add</Button>
  </div>
</template>

<script>
  import {apiListTriggerByNoteId} from "../../../api/api";

  export default {
    name: "triggerList",
    data() {
      return {
        triggerList: []
      }
    },
    methods: {
      loadAllData() {
        apiListTriggerByNoteId({
          noteId: this.$store.state.note_id
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.triggerList = response.data.data.triggerList
          }
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
