<template>
  <div>
    <div v-for="(item, index) in emailList"
         :key="index"
         :email="item"
    ></div>
  </div>
</template>

<script>
  import emailRow from './emailRow'

  export default {
    name: "emailList",
    components: {
      emailRow
    },
    props: [
      'ak18',
      'emailList'
    ],
    mounted() {
      console.log(this.emailList)
      console.log(this.ak18)
    }
  }
</script>

<style scoped>

</style>
