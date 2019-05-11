<template>
  <p>
    Name: {{ value }}
  </p>
  <p>
    <Button @click="handleRender">Custom content</Button>
  </p>
</template>

<script>
  export default {
    name: "newEmail",
    data() {
      return {
        value: ''
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
