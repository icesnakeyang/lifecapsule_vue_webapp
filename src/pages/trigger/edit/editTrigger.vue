<template>
  <div>
    <Alert type="error">设置一个触发条件，当条件满足时，系统会自动把该笔记发送给指定的用户。</Alert>
    <Form label-position="right" :label-width="100">
      <FormItem label="触发器名称">
        <Input type="text" v-model="triggerName"></Input>
      </FormItem>
      <FormItem label="说明">
        <textarea type="text" rows="2" style="width: 100%;" v-model="triggerRemark"></textarea>
      </FormItem>
    </Form>
    <Tabs>
      <TabPane label="触发条件" icon="md-transgender">
        <Form label-position="right" :label-width="100">
          <div class="gogo_btn">
            <Button type="error" class="gogo_button" @click="btSelectGogoKey">Select gogoKey</Button>
          </div>
          <div v-if="showGogoKey">
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
        triggerName: '',
        triggerRemark: '',
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
    },
    methods: {
      loadAllData() {
        console.log(this.$store.state.note_id)
        /**
         * 根据noteId，读取trigger
         */
        apiGetTriggerByNoteId({
          noteId: this.$store.state.note_id
        }).then((response) => {
          if (response.data.code === 0) {
            console.log(response.data.data)
            if (response.data.data === {}) {
              console.log(1)
            } else {
              console.log(2)
            }
            console.log(4)
            if (response.data.data.trigger) {
              this.trigger = response.data.data.trigger
            }
            console.log(5)
            console.log(this.trigger.triggerId)
            if (this.trigger.triggerId) {
              console.log(10)
              this.gogoKey = this.trigger.gogoKey
              this.$store.dispatch('saveTriggerId', this.trigger.triggerId)
              console.log(this.$store.state.trigger_id)
            } else {
              console.log(11)
            }

            console.log(this.trigger)

            console.log(this.$store.state.trigger_name)

            if (this.$store.state.trigger_name) {
              this.triggerName = this.$store.state.trigger_name
              console.log(this.triggerName)
            }
            if (this.$store.state.trigger_remark) {
              this.triggerRemark = this.$store.state.trigger_remark
            }
          }
        })

        if (this.$route.params.gogoPublicKeyId) {
          this.loadPublicKey()
        }
      },

      loadPublicKey() {
        apiGetGogoPublicKey({
          gogoPublicKeyId: this.$route.params.gogoPublicKeyId
        }).then((response) => {
          if (response.data.code === 0) {
            this.gogoKey = response.data.data.key
            console.log(this.gogoKey)
          }
        })
      },

      onAddRecipient() {
        const trigger = {
          triggerName: this.triggerName,
          triggerRemark: this.triggerRemark,
        }
        this.$store.dispatch('saveTrigger', trigger)
        this.$router.push({
          name: 'addRecipient'
        })
      }
      ,
      btSelectGogoKey() {
        const trigger = {
          triggerName: this.triggerName,
          triggerRemark: this.triggerRemark,
          gogoKey: this.gogoKey
        }
        this.$store.dispatch('saveTrigger', trigger)
        this.$router.push({
          name: 'editGogoKey'
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
        })
      }
    }
    ,
    mounted() {
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
