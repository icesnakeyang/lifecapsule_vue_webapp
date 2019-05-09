<template>
  <div>
    <Form>
      <FormItem>
        <Button type="primary" @click="onClick">{{recipient.recipientName}}</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "recipientRow",
    props: {
      recipient: {}
    },
    methods: {
      onClick() {
        console.log(this.recipient.recipientId)
        this.$router.push({
          name: 'recipient',
          params: {
            recipientId: this.recipient.recipientId
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
