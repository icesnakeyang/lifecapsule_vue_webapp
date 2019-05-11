<template>
  <div>
    <Row class="gogo_row">
      <Col span="22">
        <Input v-model="email"></Input>
      </Col>
      <Col span="2">
        <span @click="onEmailDel" style="float: right">
          <Icon color="red" size="24" type="md-close"/>
        </span>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "emailRow",
    props: {
      email: {}
    },
    methods: {
      onEmailDel() {
        console.log('delete email')
      },

    },
    mounted() {
      console.log(this.email)
    }
  }
</script>

<style scoped>
  @import "../../assets/gogoStyle.css";
</style>
