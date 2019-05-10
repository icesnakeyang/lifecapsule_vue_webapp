<template>
  <div>
    <Form>
      <FormItem>
        <Input v-model="person.personName"></Input>
      </FormItem>
      <FormItem>
        <Tabs :animated="false">
          <TabPane label="email">
            <Row>
              <Col span="22">
                <Input v-model="person.personName"></Input>
              </Col>
              <Col span="2">
                <span @click="onEmailDel" style="float: right">
                  <Icon color="red" size="24" type="md-close"/>
                </span>
              </Col>
            </Row>
            <Button type="primary">add</Button>
          </TabPane>
        </Tabs>

      </FormItem>
      <FormItem>
        <Tabs :animated="false">
          <TabPane label="phone">
            <Input v-model="person.personName"></Input>
          </TabPane>
        </Tabs>
      </FormItem>
      <FormItem>
        <Tabs :animated="false">
          <TabPane label="address">
            <Input v-model="person.personName"></Input>
          </TabPane>
        </Tabs>
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
          this.person = response.data.data.person
        })
      },
      onEmailDel() {
        console.log('delete email')
      }
    },
    mounted() {
      console.log(this.$store.state.recipient_id)
      console.log(this.$route.params.personId)
      if (this.$route.params.personId) {
        this.$store.dispatch('savePersonId', this.$route.params.personId)
      }
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
