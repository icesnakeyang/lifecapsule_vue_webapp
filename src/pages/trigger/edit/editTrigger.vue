<template>
  <div>
    <Tabs>
      <TabPane label="触发条件" icon="md-transgender">
        <Alert type="error">设置一个触发条件，当条件满足时，系统会自动把该笔记发送给指定的用户。</Alert>
        <Button type="error" class="gogo_button" @click="onAddCondition">Select Condition</Button>
        <Form>
          <FormItem label="Title">
            <Input v-model="condition.title" readonly></Input>
          </FormItem>
          <Form label-position="right" :label-width="100">
            <div v-for="(item, index) in condition.params">
              <FormItem label="参数">
                <Input v-model="item.param" readonly></Input>
              </FormItem>
              <FormItem label="值">
                <DatePicker :transfer=true type="datetime"
                            placeholder="Select date and time"
                            v-model="item.value"
                            style="width: 200px"></DatePicker>
                <br>
              </FormItem>
            </div>
          </Form>
        </Form>
        <Button type="error" class="gogo_button" @click="btSaveCondition">Save Condition</Button>
      </TabPane>
    </Tabs>
    <Tabs>
      <TabPane label="接收人" icon="md-contacts">
        <Alert>指定接收人，条件触发时，系统会自动把笔记发送给此人。</Alert>
        <recipient-list :recipientList="recipientList"></recipient-list>
        <Button type="primary" class="gogo_button" @click="onAddRecipient">Add recipient</Button>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import {apiGetTriggerByTriggerId} from "@/api/api";
  import recipientList from '../../recipient/list/recipientList'
  import conditionList from '../../condition/list/conditionList'
  import {apiGetGogoPublicKey} from "../../../api/api";

  export default {
    name: "editTrigger",
    components: {
      recipientList,
      conditionList
    },
    data() {
      return {
        recipientList: [],
        condition: {}
      }
    },
    methods: {
      loadAllData() {
        apiGetTriggerByTriggerId({
          triggerId: this.$store.state.trigger_id
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.recipientList = response.data.data.recipientList
            apiGetGogoPublicKey({
              uuid: this.condition.uuid
            }).then((response) => {
              console.log(response)
              if (response.data.code === 0) {
                this.condition = response.data.data.key
                console.log(this.condition)
              }
            })
          }
        })
      },
      onAddRecipient() {
        this.$router.push({
          name: 'addRecipient'
        })
      },
      onAddCondition() {
        this.$router.push({
          name: 'selectGogoKey'
        })
      },
      btSaveCondition() {
        console.log(this.condition)
        let params = {
          uuid: this.condition.uuid,
          params: this.condition.params
        }
        console.log(params)

        return
      }
    },
    mounted() {
      console.log('old trigger id: ' + this.$store.state.trigger_id)
      console.log('param trigger id: ' + this.$route.params.triggerId)
      console.log('uuid:' + this.$route.params.uuid)
      if (this.$route.params.uuid) {
        this.condition.uuid = this.$route.params.uuid
        console.log(this.condition)
      }

      if (this.$route.params.triggerId) {
        this.$store.dispatch('saveTriggerId', this.$route.params.triggerId)
      }

      console.log('now trigger id: ' + this.$store.state.trigger_id)

      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
