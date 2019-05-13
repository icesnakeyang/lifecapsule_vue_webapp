<template>
  <div>
    <condition-row v-for="(item, index) in conditionList"
         :key="index"
         :condition="item"
    ></condition-row>
  </div>
</template>

<script>
  import conditionRow from './conditionRow'

  export default {
    name: "conditionList",
    components: {
      conditionRow
    },
    props: {
      conditionList: Array
    }
  }
</script>

<style scoped>

</style>
