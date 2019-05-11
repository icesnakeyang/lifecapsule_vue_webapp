<template>
  <div>
    <trigger-row v-for="(item, index) in triggerList"
                  :key="index"
                  :trigger="item">
    </trigger-row>
  </div>
</template>

<script>
  import {apiListTriggerByNoteId} from "../../../api/api";
  import triggerRow from './triggerRow'

  export default {
    name: "triggerList",
    components: {
      triggerRow
    },
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
