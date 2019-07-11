<template>
  <div>
    <div>param</div>
    <div>{{item.param}}</div>
    <div>{{item.value}}</div>
    <div v-if="paramTime">
      时间驱动
    </div>
  </div>
</template>

<script>
  export default {
    name: "gogoKeyParam",
    props: {
      item: {}
    },
    computed: {
      paramTime() {
        if (this.item.type === 'datetime') {
          return true
        }
        return false
      }
    }
  }
</script>

<style scoped>

</style>
