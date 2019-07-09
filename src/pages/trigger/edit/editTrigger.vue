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
        <Button type="error" class="gogo_button" @click="btSelectGogoKey">Select gogoKey</Button>
        <Form>
          <FormItem label="Title">
            <Input v-model="trigger.title" readonly></Input>
          </FormItem>
          <Form label-position="right" :label-width="100">
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
          </Form>
        </Form>
        <Button type="error" class="gogo_button" @click="btSaveGogoKey">Save gogoKey</Button>
      </TabPane>
    </Tabs>
    <Tabs>
      <TabPane label="接收人" icon="md-contacts">
        <Alert>指定接收人，条件触发时，系统会自动把笔记发送给此人。</Alert>
        <recipient-list :recipientList="trigger.recipientList"></recipient-list>
        <Button type="primary" class="gogo_button" @click="onAddRecipient">Add recipient</Button>
      </TabPane>
    </Tabs>
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
        gogoKey: {}
      }
    },
    methods: {
      loadAllData() {
        if (this.$store.state.trigger_id) {
          apiGetTriggerByTriggerId({
            triggerId: this.$store.state.trigger_id
          }).then((response) => {
            if (response.data.code === 0) {
              this.trigger = response.data.data.trigger
            }
          })
        }
        apiGetGogoPublicKey({
          uuid: this.gogoKey.gogoPublicKeyId
        }).then((response) => {
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
      btSaveGogoKey() {
        console.log(this.gogoKey.gogoPublicKeyId)
        let params = {
          triggerId: this.$store.state.trigger_id,
          noteId: this.$store.state.note_id,
          remark: this.trigger.remark,
          uuid: this.gogoKey.gogoPublicKeyId,
          params: this.gogoKey.params
        }

        console.log(params)

        return

        apiSaveGogoKey({params}).then((response) => {
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

</style>
