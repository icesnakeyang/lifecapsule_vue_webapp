<template>
  <div>
    <CellGroup>
      <div @click="onClick">
        <Cell class="gogoCell"
              title="Time Trigger" label="Set time to start the trigger"/>
      </div>
      <Cell class="gogoCell" title="Display label content" label="label content"/>
      <Cell class="gogoCell" title="Display label content" label="label content"/>
      <Cell class="gogoCell" title="Display label content" label="label content"/>
    </CellGroup>
  </div>
</template>

<script>
  export default {
    name: "selectGogoKey",
    methods: {
      onClick() {
        console.log(2)
      }
    }
  }
</script>

<style scoped>
  .gogoCell {
    background: #bec4d0;
    margin-top: 10px;
  }

</style>
