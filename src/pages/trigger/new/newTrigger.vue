<template>

</template>

<script>
  export default {
    name: "newTrigger",
    data() {
      return {
        recipientList: []
      }
    },
    methods:{
      onAddRecipient(){
        this.$router.push({
          name:'addRecipient'
        })
      }
    }
  }
</script>

<style scoped>

</style>
