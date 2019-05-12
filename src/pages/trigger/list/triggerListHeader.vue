<template>
  <Header style="padding: 0px">
    <Menu mode="horizontal" theme="dark" active-name="2" @on-select="onMenuItem">
      <MenuItem name="menuBack" class="gogo_menuItem">
        <Icon type="ios-arrow-back"></Icon>
      </MenuItem>
      <div class="layout-nav" :style="{float:'right'}">
        <MenuItem name="menuAddTrigger" class="gogo_menuItem">
          <Icon type="md-add"></Icon>
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>

<script>
  export default {
    name: "triggerListHeader",
    methods: {
      onMenuItem(name) {
        if (name === 'menuBack') {
          this.$router.back()
        }
        if (name === 'menuAddTrigger') {
          this.$store.dispatch('clearTriggerId')
          this.$router.push({
            name: 'newTrigger'
          })
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
