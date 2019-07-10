<template>
  <div>
    <Button type="primary" @click="btSelectKey">select</Button>
  </div>
</template>

<script>
  import {apiListGogoPublicKey} from "../../../api/api";

  export default {
    name: "editGogoKey",
    data() {
      return {
        gogoKeys: []
      }
    },
    methods: {
      loadAllData() {
        /**
         * 读取所有可以选择的触发条件
         * gogoKey
         */
        apiListGogoPublicKey({}).then((response) => {
          if (response.data.code === 0) {
            this.gogoKeys = response.data.data.list
            console.log(this.gogoKeys)
          }
        })
      },

      btSelectKey(){
        this.$router.push({
          name:'selectGogoKey' +
            ''
        })

      },

      onClick(item) {
        /**
         * 选择一个触发条件
         * 跳转到触发条件的配置页面
         */
        console.log(item)
        if (item.gogoPublicKeyId) {
          this.$router.push({
            name: 'editTrigger',
            params: {
              gogoPublicKeyId: item.gogoPublicKeyId
            }
          })
        }
      }
    },
    mounted(){
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
