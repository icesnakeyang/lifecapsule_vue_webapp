<template>
  <div>
    <Form>
      <FormItem>
        <Input v-model="recipient.name"></Input>
      </FormItem>
      <FormItem>
        <Tabs :animated="false">
          <TabPane label="email">
                        <email-list :ak18="ok18"></email-list>
                        <email-list :emailList="recipient.name"></email-list>
<!--            <email-row v-for="(item, index) in recipient.emailList"-->
<!--                       :key="index"-->
<!--                       :email="item"></email-row>-->
            <Button type="primary" @click="handleRender">add</Button>
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

    <p>
      Name: {{ value }}
    </p>

  </div>
</template>

<script>
  import {apiGetRecipientByRecipientId} from "../../../api/api";
  import emailList from '../../../components/email/emailList'
  import emailRow from '../../../components/email/emailRow'

  export default {
    name: "editRecipient",
    components: {
      emailList,
      emailRow
    },
    data() {
      return {
        recipient: {},
        emailList: [],
        ok18:{}
      }
    },
    methods: {
      loadAllData() {
        apiGetRecipientByRecipientId({
          recipientId: this.$store.state.recipient_id
        }).then((response) => {
          console.log(response)
          this.recipient = response.data.data.recipient
          console.log(this.recipient.emailList)
          this.ok18="okokok18"
        })
      },

      handleRender() {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: 'Please enter your name...'
              },
              on: {
                input: (val) => {
                  this.value = val;
                }
              }
            })
          }
        })
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
