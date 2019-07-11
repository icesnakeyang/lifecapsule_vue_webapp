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
        <gogo-key-param v-for="(item,index) in gogoKey.params"
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
        if (this.$route.params.gogoPublicKeyId) {
          //选择了公共模板，显示模板设置
          apiGetGogoPublicKey({
            gogoPublicKeyId: this.$route.params.gogoPublicKeyId
          }).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              console.log(this.gogoMSG)
              if (this.gogoMSG) {
                console.log(1)
              } else {
                console.log(2)
              }
              this.gogoKey = response.data.data.key
            }
          })
        } else {
          console.log(this.$store.state.trigger_id)
          if (this.$store.state.trigger_id) {
            apiGetGogoKeyByTriggerId({
              triggerId: this.$store.state.trigger_id
            }).then((response) => {
              console.log(response)
              if (response.data.code === 0) {
                console.log(this.gogoMSG)
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
        apiSaveGogoKey({
          triggerId: this.$store.state.trigger_id,
          gogoPublicKeyId: this.gogoKey.gogoPublicKeyId,
          params: this.gogoKey.params
        }).then((response) => {
          console.log(response)
        })
      }
    },
    mounted() {
      console.log(this.$store.state.trigger_id)
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
