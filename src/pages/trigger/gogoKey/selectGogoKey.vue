<template>
  <div>
    <CellGroup v-for="(item, index) in gogoKeys" :key="index">
      <div @click="onClick(item)">
        <Cell class="gogoCell"
              :title="item.title" :label="item.type"/>
      </div>
    </CellGroup>
  </div>
</template>

<script>
  import {apiListGogoPublicKey} from "../../../api/api";

  export default {
    name: "selectGogoKey",
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
            this.gogoKeys = response.data.data.gogoPublicKeyList
          }
        })
      },
      onClick(item) {
        /**
         * 选择一个触发条件
         * 跳转到触发条件的配置页面
         */
        if (item.publicKeyId) {
          this.$router.push({
            name: 'editGogoKey',
            params: {
              gogoPublicKeyId: item.publicKeyId
            }
          })
        }
      }
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>
  .gogoCell {
    background: #bec4d0;
    margin-top: 10px;
  }

</style>
