<template>
  <div>
    <Form>
      <FormItem>
        <Input v-model="person.recipientName"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {apiGetPersonByPersonId} from "@/api/api";

  export default {
    name: "editPerson",
    data() {
      return {
        person: {}
      }
    },
    methods: {
      loadAllData() {
        apiGetPersonByPersonId({
          personId: this.$store.state.person_id
        }).then((response) => {
          console.log(response)
        })
      }
    },
    mounted() {
      console.log(this.$store.state.recipient_id)
      console.log(this.$route.params.personId)
      if (this.$route.params.personId) {
        this.$store.dispatch('savePersonId', this.$route.params.personId)
      }
    }
  }
</script>

<style scoped>

</style>
