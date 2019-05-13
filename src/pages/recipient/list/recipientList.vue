<template>
  <div>
    <recipient-row v-for="(item, index) in recipientList"
                   :key="index"
                   :recipient="item"></recipient-row>
  </div>
</template>

<script>
  import recipientRow from './recipientRow'

  export default {
    name: "recipientList",
    components:{
      recipientRow
    },
    props: {
      recipientList: Array
    }
  }
</script>

<style scoped>

</style>
