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
        <Button type="error" class="gogo_button">Add recipient</Button>
      </TabPane>
    </Tabs>
    <Tabs>
      <TabPane label="接收人" icon="md-contacts">
        <Alert>指定接收人，条件触发时，系统会自动把笔记发送给此人。</Alert>
        <person-row v-for="(item, index) in personList"
                    :key="index"
                    :person="item"></person-row>
        <Button type="primary" class="gogo_button" @click="onAddPerson">Add recipient</Button>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import {listRecipientPersonByRecipientId} from "@/api/api";
  import PersonRow from './personRow'

  export default {
    name: "recipient",
    components: {
      PersonRow
    },
    data() {
      return {
        personList: []
      }
    },
    methods: {
      loadAllData() {
        if (this.$store.state.recipient_id) {
          //如果有触发器，就查询规则和接收人
          listRecipientPersonByRecipientId({
            recipientId: this.$store.state.recipient_id
          }).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              this.personList = response.data.data.personList
              console.log(this.personList)
            }
          })
        }
      },
      onAddPerson() {
        this.$router.push({
          name: 'addPerson'
        })
      }
    },
    mounted() {
      if (this.$route.params.recipientId) {
        this.$store.dispatch('saveRecipientId', this.$route.params.recipientId)
      }
      this.loadAllData()
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
