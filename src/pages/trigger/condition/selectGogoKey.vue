<template>
  <div>
    <CellGroup>
      <div @click="onClick">
        <Cell class="gogoCell"
              title="Time Trigger" label="Set time to start the trigger"/>
      </div>
    </CellGroup>
  </div>
</template>

<script>
  export default {
    name: "selectGogoKey",
    methods: {
      loadAllData() {
        /**
         * 读取所有可以选择的触发条件
         * gogoKey
         */
      },
      onClick() {
        /**
         * 选择一个触发条件
         * 跳转到触发条件的配置页面
         */
        console.log(2)
        this.$router.push({
          name:'editTrigger'
        })
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
