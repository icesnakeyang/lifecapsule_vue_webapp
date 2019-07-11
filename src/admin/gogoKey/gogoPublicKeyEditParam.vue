<template>
  <div>
    <FormItem>
      <Input v-model="row.param"></Input>
    </FormItem>
    <FormItem>
      <Input v-model="row.type"></Input>
    </FormItem>
    <FormItem>
      <Input v-model="row.value"></Input>
    </FormItem>
  </div>
</template>

<script>
  export default {
    name: "gogoPublicKeyEditParam",
    props: {
      row: {}
    }
  }
</script>

<style scoped>

</style>
