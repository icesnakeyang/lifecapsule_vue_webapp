<template>
  <div>
    <Row class="gogo_row">
      <Col :xs="22" :sm="22" :md="22" :lg="22">
        <Tag color="primary">{{person.recipientName}}</Tag>
      </Col>
      <Col :xs="2" :sm="2" :md="2" :lg="2">
        <Icon class="gogo_list_icon" type="md-close"/>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "personRow",
    props: {
      person: {}
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
