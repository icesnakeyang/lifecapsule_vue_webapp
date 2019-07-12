<template>
  <div>
    <Alert type="error">设置一个触发条件，当条件满足时，系统会自动把该笔记发送给指定的用户。</Alert>
    <Form label-position="right" :label-width="100">
      <FormItem label="触发器名称">
        <Input type="text" v-model="trigger.triggerName"></Input>
      </FormItem>
      <FormItem label="说明">
        <textarea type="text" rows="2" style="width: 100%;" v-model="trigger.triggerRemark"></textarea>
      </FormItem>
    </Form>
    <Tabs>
      <TabPane label="触发条件" icon="md-transgender">
        <Form label-position="right" :label-width="100">
          <div class="gogo_btn">
            <Button type="error" class="gogo_button" @click="btSelectGogoKey">Select gogoKey</Button>
          </div>
          <div v-if="gogoPublicKeyId">
            <FormItem>
              <Input v-model="gogoKey.title" readonly></Input>
            </FormItem>
            <FormItem>
              <Input v-model="gogoKey.description" readonly></Input>
            </FormItem>
            <gogo-key-param v-for="(item, index) in gogoKey.params"
                            :item="item"
                            :key="index">
            </gogo-key-param>
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
  import {apiGetGogoPublicKey, apiGetTriggerByNoteId, apiSaveGogoKey} from "../../../api/api";
  import gogoKeyParam from '../gogoKey/gogoKeyParam'

  export default {
    name: "editTrigger",
    components: {
      recipientList,
      gogoKeyParam
    },
    data() {
      return {
        trigger: {},
        gogoKey: {},
        recipientList: [],
        gogoPublicKeyId: ''
      }
    },
    computed: {
      showGogoKey() {
        if (this.gogoKey) {
          if (this.gogoKey.title) {
            return true
          }
        }
        return false
      }
    }
    ,
    methods: {
      loadAllData() {
        return
        console.log(this.$store.state.trigger_id)
        if (this.$route.params.gogoPublicKeyId) {
          apiGetGogoPublicKey({
            gogoPublicKeyId: this.gogoPublicKeyId
          }).then((response) => {
            console.log(response.data.data)
            if (response.data.code === 0) {
              console.log(1)
              this.gogoKey = response.data.data.key
              console.log(this.gogoKey)
            }
          })
        } else {
          if (this.$store.state.trigger_id) {
            apiGetTriggerByTriggerId({
              triggerId: this.$store.state.trigger_id
            }).then((response) => {
              if (response.data.code === 0) {
                this.trigger = response.data.data.trigger
                this.gogoKey = response.data.data.trigger.gogoKey
                this.recipientList = response.data.data.trigger.recipientList
              }
            })
          } else {
            /**
             * 根据noteId，读取trigger
             */
            apiGetTriggerByNoteId({
              noteId: this.$store.state.note_id
            }).then((response) => {
              console.log(response)
              if (response.data.code === 0) {
                this.trigger = response.data.data.trigger
                console.log(22)
              }
            })
          }
        }
      },
      onAddRecipient() {
        this.$store.dispatch('saveTrigger', this.trigger)
        this.$router.push({
          name: 'addRecipient'
        })
      }
      ,
      btSelectGogoKey() {
        this.$store.dispatch('saveTrigger', this.trigger)
        this.$router.push({
          name: 'selectGogoKey'
        })
      }
      ,

      btSaveTrigger() {
        let params1 = {
          noteId: this.$store.state.note_id,
          gogoPublicKeyId: this.gogoKey.gogoPublicKeyId,
          params: this.gogoKey.params,
          triggerId: this.trigger.triggerId,
          triggerName: this.trigger.triggerName,
          triggerRemark: this.trigger.triggerRemark
        }

        console.log(params1)
        return
        apiSaveGogoKey(params1).then((response) => {
          console.log(response)
        })
      }
    }
    ,
    mounted() {
      console.log('mount')
      if (this.$route.params.gogoPublicKeyId) {
        this.gogoPublicKeyId = this.$route.params.gogoPublicKeyId
      }
      console.log(this.trigger)
      this.trigger.triggerName = this.$store.state.trigger_name
      this.trigger.triggerRemark = this.$store.state.trigger_remark
      this.trigger.triggerId = this.$store.state.trigger_id
      console.log(this.trigger)
      console.log('publicKeyId:' + this.gogoPublicKeyId)
      console.log('noteId:' + this.$store.state.note_id)
      console.log('triggerId:' + this.$store.state.trigger_id)
      console.log('trigger_name:' + this.$store.state.trigger_name)
      console.log('trigger_remark:' + this.$store.state.trigger_remark)
      // this.loadAllData()
      console.log(this.trigger)
    }
  }
</script>

<style scoped>
  .gogo_btn {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
