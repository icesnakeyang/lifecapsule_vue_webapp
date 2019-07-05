<template>
<div>
  this is blank
</div>
</template>

<script>
  export default {
    name: "allBlank",
    data(){
      return{

      }
    },
    mounted() {
      console.log(1)
      this.$router.replace({
        name: "editTrigger"
      })
    }
  }
</script>

<style scoped>

</style>
