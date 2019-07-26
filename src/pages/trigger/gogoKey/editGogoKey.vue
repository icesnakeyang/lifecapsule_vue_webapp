<template>
  <div>
    <Alert v-if="gogoMSG" type="warning" show-icon>{{gogoMSG}}</Alert>
    <Button type="primary" @click="btSelectKey">select</Button>
    <div v-if="gogoMSG">

    </div>
    <div v-else="gogoMSG">
      <Form :label-width="80">
        <FormItem label="Title">
          <Input v-model="gogoKey.title" readonly></Input>
        </FormItem>
        <FormItem label="Description">
          <Input v-model="gogoKey.description" readonly></Input>
        </FormItem>
        <gogo-key-param v-for="(item,index) in gogoKey.keyParams"
                        :item=item
                        :key=index>
        </gogo-key-param>
        <Button type="primary" @click="btSaveGogoKey">Save gogoKey</Button>
      </Form>
    </div>
  </div>
</template>

<script>
  import {apiGetGogoKeyByTriggerId, apiGetGogoPublicKey, apiSaveGogoKey} from "../../../api/api";
  import gogoKeyParam from "./gogoKeyParam"

  export default {
    name: "editGogoKey",
    components: {
      gogoKeyParam
    },
    data() {
      return {
        gogoKey: {},
        gogoMSG: ''
      }
    },
    methods: {
      loadAllData() {
        /**
         * 1、如果有gogoKey，就显示gogoKey
         * 2、如果还没有gogoKey，就只显示select gogoKey按钮
         * 3、如果有gogoPublicKeyId，就读取公共模板，显示
         */
        console.log(this.$route.params.gogoPublicKeyId)
        if (this.$route.params.gogoPublicKeyId) {
          //选择了公共模板，显示模板设置
          apiGetGogoPublicKey({
            gogoKeyId: this.$route.params.gogoPublicKeyId
          }).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              this.gogoKey = response.data.data.key
            }
          })
        } else {
          if (this.$store.state.trigger_id) {
            apiGetGogoKeyByTriggerId({
              triggerId: this.$store.state.trigger_id
            }).then((response) => {
              if (response.data.code === 0) {
                this.gogoKey = response.data.data.gogoKey
              } else {
                this.gogoMSG = "No gogoKey was set, please set one"
              }
            })
          }
        }
      },

      btSelectKey() {
        this.$router.push({
          name: 'selectGogoKey'
        })
      },

      btSaveGogoKey() {
        console.log(this.gogoKey)
        console.log(this.$store.state)
        const params = {
          triggerId: this.$store.state.trigger_id,
          params: this.gogoKey.keyParams,
          noteId: this.$store.state.note_id,
          triggerName: this.$store.state.trigger_name,
          triggerRemark: this.$store.state.trigger_remark
        }

        console.log(params)

        apiSaveGogoKey(params).then((response) => {
          if (response.data.code === 0) {
            this.$Message.success('Save success!')
            this.$router.push({
              name: 'editTrigger'
            })
          }
        })
      }
    },
    mounted() {
      console.log(this.$store.state)
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
