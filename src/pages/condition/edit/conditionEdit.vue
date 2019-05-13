<template>
  <div>
    <Form>
      <FormItem label="name">
        <Input v-model="condition.name"></Input>
      </FormItem>
      <FormItem label="remark">
        <Input v-model="condition.remark"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {apiGetConditionByConditionId} from "../../../api/api";

  export default {
    name: "conditionEdit",
    data() {
      return {
        condition: {}
      }
    },
    methods: {
      loadAllData() {
        apiGetConditionByConditionId({
          conditionId: this.$store.state.condition_id
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.condition = response.data.data.condition
          }
        })
      }
    },
    mounted() {
      if (this.$route.params.conditionId) {
        this.$store.dispatch('saveConditionId', this.$route.params.conditionId)
      }
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
