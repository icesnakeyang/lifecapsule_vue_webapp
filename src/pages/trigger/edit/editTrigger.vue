<template>
  <div>
    <Tabs>
      <TabPane label="触发条件" icon="md-transgender">
        <Alert type="error">设置一个触发条件，当条件满足时，系统会自动把该笔记发送给指定的用户。</Alert>
        <Row class="gogo_row">
          <Col :xs="22" :sm="22" :md="22" :lg="22">
            <Tag color="error">3个月后</Tag>
          </Col>
          <Col :xs="2" :sm="2" :md="2" :lg="2">
            <Icon class="gogo_list_icon" type="md-close"/>
          </Col>
        </Row>
        <Row class="gogo_row">
          <Col :xs="22" :sm="22" :md="22" :lg="22">
            <Tag color="error">下个星期天是晴天</Tag>
          </Col>
          <Col :xs="2" :sm="2" :md="2" :lg="2">
            <Icon class="gogo_list_icon" type="md-close"/>
          </Col>
        </Row>
        <Button type="error" class="gogo_button" @click="onAddCondition">Add condition</Button>
      </TabPane>
    </Tabs>
    <Tabs>
      <TabPane label="接收人" icon="md-contacts">
        <Alert>指定接收人，条件触发时，系统会自动把笔记发送给此人。</Alert>
        <recipient-row v-for="(item, index) in recipientList"
                       :key="index"
                       :recipient="item"></recipient-row>
        <Button type="primary" class="gogo_button" @click="onAddRecipient">Add recipient</Button>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import {apiGetTriggerByTriggerId} from "@/api/api";
  import recipientRow from '../../recipient/list/recipientRow'

  export default {
    name: "editTrigger",
    components: {
      recipientRow
    },
    data() {
      return {
        recipientList: []
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
