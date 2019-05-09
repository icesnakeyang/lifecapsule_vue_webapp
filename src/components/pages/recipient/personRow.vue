<template>
  <div>
    <Row class="gogo_row">
      <Col :xs="22" :sm="22" :md="22" :lg="22">
        <Button type="primary" @click="onClick">{{person.personName}}</Button>
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
    },
    methods:{
      onClick(){
        console.log(this.person)
        this.$router.push({
          name:'editPerson',
          params:{
            personId:this.person.personId
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
