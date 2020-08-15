<template>
  <div>
    <Alert v-if="gogoMSG" type="warning" show-icon>{{gogoMSG}}</Alert>
    <Button type="primary" @click="btSelectKey">{{$t('gogoKey.gogoPublicKey')}}</Button>
    <div v-if="gogoMSG">

    </div>
    <div v-else="gogoMSG">
      <Form :label-width="80">
        <FormItem :label="$t('gogoKey.title')">
          <Input v-model="gogoKey.title" readonly></Input>
        </FormItem>
        <FormItem :label="$t('gogoKey.description')">
          <Input v-model="gogoKey.description" readonly></Input>
        </FormItem>
        <gogo-key-param v-for="(item,index) in gogoKey.keyParams"
                        :item=item
                        :key=index>
        </gogo-key-param>
        <Button type="primary" @click="btSaveGogoKey">{{$t('common.btSave')}}</Button>
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
        if(this.$route.params.gogoPublicKeyId){
          //选择了公共模板，显示模板设置
          apiGetGogoPublicKey({
            gogoKeyId: this.$route.params.gogoPublicKeyId
          }).then((response) => {
            if (response.data.code === 0) {
              console.log(3)
              this.gogoKey = response.data.data.key
              console.log(this.gogoKey)
            } else {
              this.$Message.error(this.$t('common.loadDataError'))
            }
          })
        } else {
          if (this.$store.state.trigger_id) {
            apiGetGogoKeyByTriggerId({
              triggerId: this.$store.state.trigger_id
            }).then((response) => {
              console.log(5)
              console.log(response.data)
              if (response.data.code === 0) {
                this.gogoKey = response.data.data.gogoKey
                console.log(this.gogoKey)
              } else {
                // this.$store.dispatch('clearTriggerId')
                this.gogoMSG = this.$t('gogoKey.msgNoKey')
              }
            })
          } else {
            this.gogoMSG = this.$t('gogoKey.msgNoKey')
          }
        }
      },

      btSelectKey() {
        this.$router.push({
          name: 'selectGogoKey'
        })
      },

      btSaveGogoKey() {
        const params = {
          title: this.gogoKey.title,
          description: this.gogoKey.description,
          gogoPublicKeyId: this.gogoKey.publicKeyId,
          triggerId: this.$store.state.trigger_id,
          keyParams: this.gogoKey.keyParams,
          noteId: this.$store.state.note_id,
          triggerName: this.$store.state.trigger_name,
          triggerRemark: this.$store.state.trigger_remark
        }

        console.log(params)

        apiSaveGogoKey(params).then((response) => {
          if (response.data.code === 0) {
            this.$Message.success(this.$t('common.btSaveSuccess'))
            this.$router.push({
              name: 'editTrigger'
            })
          }
        })
      }
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
