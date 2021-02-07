<template>
  <div>
    <Alert type="error">{{$t('trigger.alert1')}}</Alert>
    <Form label-position="right" :label-width="100">
      <FormItem :label="$t('trigger.triggerName')">
        <Input type="text" v-model="triggerName"></Input>
      </FormItem>
      <FormItem :label="$t('trigger.description')">
        <textarea type="text" rows="2" style="width: 100%;" v-model="triggerRemark"></textarea>
      </FormItem>
    </Form>
    <Tabs>
      <TabPane :label="$t('trigger.gogoKeys')" icon="md-transgender">
        <Form label-position="right" :label-width="100">
          <div class="gogo_btn">
            <Button type="error" class="gogo_button" @click="btSelectGogoKey">{{$t('trigger.btSetGogoKey')}}</Button>
          </div>
          <div v-if="showGogoKey">
            <FormItem>
              <Input v-model="gogoKey.title" readonly></Input>
            </FormItem>
            <FormItem>
              <Input v-model="gogoKey.description" readonly></Input>
            </FormItem>
            <gogo-key-param v-for="(item, index) in gogoKey.keyParams"
                            :item="item"
                            :key="index">
            </gogo-key-param>
          </div>
        </Form>
      </TabPane>
    </Tabs>
    <Tabs>
      <TabPane :label="$t('trigger.recipients')" icon="md-contacts">
        <Alert>{{$t('recipient.alert1')}}</Alert>
        <recipient-list :recipientList="recipientList"></recipient-list>
        <Button type="primary" class="gogo_button" @click="onAddRecipient">{{$t('recipient.btAddRecipient')}}</Button>
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
         * 如果用户从note进入，则triggerId的缓存已经清除
         * 如果用户从trigger选择进入，则从缓存里恢复triggerId
         * 即：缓存有triggerId就是选择触发器返回，没有就是从note进来的
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
          }else {
            this.$Message.error(this.$t('common.loadDataError'))
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
