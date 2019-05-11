<template>
  <div>
    <Row class="gogo_row">
      <Col span="22">
        <Button class="gogo_button" type="primary" @click="onClick">{{trigger.name}}</Button>
      </Col>
      <Col span="2">
        <Icon class="gogo_list_icon" type="md-close"/>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {apiGetTriggerByTriggerId} from "../../../api/api";

  export default {
    name: "triggerRow",
    props: {
      trigger: {}
    },
    methods: {
      onClick() {
        this.$router.push({
          name: 'editTrigger',
          params: {
            triggerId: this.trigger.triggerId
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
