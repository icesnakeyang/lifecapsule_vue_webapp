<template>
  <div>
    <Row class="gogo_row">
      <Col :xs="22" :sm="22" :md="22" :lg="22">
        <Button color="error"
                @click="onCondition"
                type="error"
                size="small">{{condition.name}}
        </Button>
      </Col>
      <Col :xs="2" :sm="2" :md="2" :lg="2">
        <Icon class="gogo_list_icon" type="md-close"/>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "conditionRow",
    props: {
      condition: {}
    },
    methods: {
      onCondition() {
        console.log(this.condition.conditionId)
        this.$router.push({
          name: 'conditionEdit',
          params: {
            conditionId: this.condition.conditionId
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
