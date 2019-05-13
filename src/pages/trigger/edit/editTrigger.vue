<template>
  <div>
    <Tabs>
      <TabPane label="触发条件" icon="md-transgender">
        <Alert type="error">设置一个触发条件，当条件满足时，系统会自动把该笔记发送给指定的用户。</Alert>
        <condition-list :conditionList="conditionList"></condition-list>
        <Button type="error" class="gogo_button" @click="onAddCondition">Add condition</Button>
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

  export default {
    name: "editTrigger",
    components: {
      recipientList,
      conditionList
    },
    data() {
      return {
        recipientList: [],
        conditionList: []
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
            this.conditionList = response.data.data.conditionList
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
          name: 'conditionNew'
        })
      }
    },
    mounted() {
      console.log('old trigger id: ' + this.$store.state.trigger_id)
      console.log('param trigger id: ' + this.$route.params.triggerId)

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
