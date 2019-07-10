<template>
  <div>
    <Alert type="error">设置一个触发条件，当条件满足时，系统会自动把该笔记发送给指定的用户。</Alert>
    <Form label-position="right" :label-width="100">
      <FormItem label="触发器名称">
        <Input type="text" v-model="trigger.name"></Input>
      </FormItem>
      <FormItem label="说明">
        <textarea type="text" rows="2" style="width: 100%;" v-model="trigger.remark"></textarea>
      </FormItem>
    </Form>
    <Tabs>
      <TabPane label="触发条件" icon="md-transgender">
        <Form label-position="right" :label-width="100">
          <div class="gogo_btn">
            <Button type="error" class="gogo_button" @click="btSelectGogoKey">Select gogoKey</Button>
          </div>
          <div v-if="gogoKey">
            <FormItem label="Title">
              <Input v-model="gogoKey.title" readonly></Input>
            </FormItem>
            <div v-for="(item, index) in gogoKey.params">
              <FormItem label="参数">
                <Input v-model="item.param" readonly></Input>
              </FormItem>
              <FormItem label="值">
                <DatePicker :transfer=true type="datetime"
                            placeholder="Select date  and time"
                            v-model="item.value"
                            style="width: 200px"></DatePicker>
                <br>
              </FormItem>
            </div>
          </div>
        </Form>
      </TabPane>
    </Tabs>
    <Tabs>
      <TabPane label="接收人" icon="md-contacts">
        <Alert>指定接收人，条件触发时，系统会自动把笔记发送给此人。</Alert>
        <recipient-list :recipientList="recipientList"></recipient-list>
        <Button type="primary" class="gogo_button" @click="onAddRecipient">Add recipient</Button>
      </TabPane>
    </Tabs>
    <div class="gogo_btn">
      <Button type="error" class="gogo_button" @click="btSaveTrigger" style="width: 100%">Save Trigger</Button>
    </div>
  </div>
</template>

<script>
  import {apiGetTriggerByTriggerId} from "@/api/api";
  import recipientList from '../../recipient/list/recipientList'
  import {apiGetGogoPublicKey, apiSaveGogoKey} from "../../../api/api";

  export default {
    name: "editTrigger",
    components: {
      recipientList
    },
    data() {
      return {
        trigger: {},
        gogoKey: {},
        recipientList: []
      }
    },
    methods: {
      loadAllData() {
        console.log(12)
        console.log(this.$store.state.trigger_id)
        if (this.$store.state.trigger_id) {
          apiGetTriggerByTriggerId({
            triggerId: this.$store.state.trigger_id
          }).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              this.trigger = response.data.data.trigger
              this.gogoKey = response.data.data.trigger.gogoKey
              this.recipientList = response.data.data.trigger.recipientList

              console.log(this.trigger)
              console.log(this.gogoKey)
              console.log(this.recipientList)
            }
          })
        }
        console.log(this.gogoKey.gogoPublicKeyId)
        apiGetGogoPublicKey({
          gogoPublicKeyId: this.gogoKey.gogoPublicKeyId
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.gogoKey = response.data.data.key
            console.log(this.gogoKey)
          }
        })
      },
      onAddRecipient() {
        this.$router.push({
          name: 'addRecipient'
        })
      },
      btSelectGogoKey() {
        this.$router.push({
          name: 'selectGogoKey'
        })
      },

      btSaveTrigger() {
        let params1 = {
          triggerName: this.trigger.name,
          remark: this.trigger.remark,
          triggerId: this.$store.state.trigger_id,
          noteId: this.$store.state.note_id,
          gogoPublicKeyId: this.gogoKey.gogoPublicKeyId,
          params: this.gogoKey.params,
          gogoKeyId: this.gogoKey.gogoKeyId
        }

        console.log(params1)

        apiSaveGogoKey(params1).then((response) => {
          console.log(response)
        })
      }
    },
    mounted() {
      if (this.$route.params.gogoPublicKeyId) {
        this.gogoKey.gogoPublicKeyId = this.$route.params.gogoPublicKeyId
      }
      console.log(this.gogoKey.gogoPublicKeyId)
      this.loadAllData()
    }
  }
</script>

<style scoped>
  .gogo_btn {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
