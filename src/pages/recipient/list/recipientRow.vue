<template>
  <div>
    <Row class="gogo_row">
      <Col :xs="22" :sm="22" :md="22" :lg="22">
        <Button type="primary" @click="onClick">{{recipient.name}}</Button>
      </Col>
      <Col :xs="2" :sm="2" :md="2" :lg="2">
        <Icon class="gogo_list_icon" type="md-close"/>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "recipientRow",
    props: {
      recipient: {}
    },
    methods:{
      onClick(){
        console.log(this.recipient)
        this.$router.push({
          name:'editRecipient',
          params:{
            recipientId:this.recipient.recipientId
          }
        })
      }
    },
    mounted(){
      console.log(this.recipient)
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
