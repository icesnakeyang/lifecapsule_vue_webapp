<template>
  <div>
    <CellGroup>
      <span @click="onRow(girl.id)">
      <Cell :title="girl.name"
            :label="girl.age.toString()"></Cell>
        </span>
    </CellGroup>
  </div>
</template>

<script>
  export default {
    name: "girlRow",
    props: {
      girl: {}
    },

    methods: {
      onRow(data) {
        console.log(data)
      }
    },

    mounted() {
      console.log('girl')
      console.log(this.girl.name)
    }
  }
</script>

<style scoped>

</style>
