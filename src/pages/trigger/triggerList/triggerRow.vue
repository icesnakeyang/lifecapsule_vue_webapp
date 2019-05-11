<template>
  <div>
    <Form>
      <FormItem>
        <Button type="primary" @click="onClick">{{trigger.name}}</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {apiGetTriggerByTriggerId} from "../../../api/api";

  export default {
    name: "triggerRow",
    props: {
      trigger: {}
    },
  }
</script>

<style scoped>

</style>
