<template>
  <div>
    <Form>
      <FormItem>
        <Input v-model="recipient.name"></Input>
      </FormItem>
      <FormItem>
        <Tabs :animated="false">
          <TabPane label="email">
            <Row>
              <Col span="22">
                <Input v-model="recipient.personName"></Input>
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
            <Input v-model="recipient.personName"></Input>
          </TabPane>
        </Tabs>
      </FormItem>
      <FormItem>
        <Tabs :animated="false">
          <TabPane label="address">
            <Input v-model="recipient.personName"></Input>
          </TabPane>
        </Tabs>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {apiGetRecipientByRecipientId} from "../../../api/api";

  export default {
    name: "editRecipient",
    data() {
      return {
        recipient: {}
      }
    },
    methods: {
      loadAllData() {
        apiGetRecipientByRecipientId({
          recipientId: this.$store.state.recipient_id
        }).then((response) => {
          console.log(response)
          this.recipient = response.data.data.recipient
        })
      },
      onEmailDel() {
        console.log('delete email')
      }
    },
    mounted() {
      console.log(this.$store.state.recipient_id)
      console.log(this.$route.params.recipientId)
      if (this.$route.params.recipientId) {
        this.$store.dispatch('saveRecipientId', this.$route.params.recipientId)
      }
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
