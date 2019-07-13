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
            <Button type="error" class="gogo_button" @click="btSelectGogoKey">Set gogoKey</Button>
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
  </div>
</template>

<script>
  import {apiGetTriggerByTriggerId} from "@/api/api";
  import recipientList from '../../recipient/list/recipientList'
  import {apiGetGogoPublicKey, apiGetTriggerByNoteId, apiSaveGogoKey} from "../../../api/api";
  import gogoKeyParam from '../gogoKey/gogoKeyParam'
  import moment from 'moment/moment'

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
        gogoPublicKeyId: '',
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
        /**
         * 根据noteId，读取trigger
         */
        apiGetTriggerByNoteId({
          noteId: this.$store.state.note_id
        }).then((response) => {
          if (response.data.code === 0) {
            if (response.data.data.trigger) {
              this.trigger = response.data.data.trigger
              this.triggerName = this.trigger.name
              this.triggerRemark = this.trigger.remark
              this.gogoKey = this.trigger.gogoKey
              this.recipientList = this.trigger.recipientList
              this.$store.dispatch('saveTriggerId', this.trigger.triggerId)
            }
            /**
             * 如果缓存里保存有triggerName和triggerRemark，则显示
             * 否则用户创建条件或添加接收人后，跳转回来时名称和备注会消失
             */
            if (this.$store.state.trigger_name) {
              this.triggerName = this.$store.state.trigger_name
            }
            if (this.$store.state.trigger_remark) {
              this.triggerRemark = this.$store.state.trigger_remark
            }
          }
        })
      },

      onAddRecipient() {
        const trigger = {
          triggerName: this.triggerName,
          triggerRemark: this.triggerRemark
        }
        if (this.$store.state.trigger_id) {
          trigger.triggerId = this.$store.state.trigger_id
        }
        this.$store.dispatch('saveTrigger', trigger)
        this.$router.push({
          name: 'addRecipient'
        })
      },

      btSelectGogoKey() {
        const trigger = {
          triggerName: this.triggerName,
          triggerRemark: this.triggerRemark,
          gogoKey: this.gogoKey
        }
        if (this.$store.state.trigger_id) {
          trigger.triggerId = this.$store.state.trigger_id
        }
        this.$store.dispatch('saveTrigger', trigger)
        this.$router.push({
          name: 'editGogoKey'
        })
      }
    },

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
