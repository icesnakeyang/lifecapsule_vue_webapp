<template>
  <Header style="padding: 0px">
    <Menu mode="horizontal" theme="dark" active-name="2" @on-select="onMenuItem">
      <MenuItem name="menuBack" class="gogo_menuItem">
        <Icon type="ios-arrow-back"></Icon>
      </MenuItem>
      <div class="layout-nav" :style="{float:'right'}">
        <MenuItem name="menuRecipient" class="gogo_menuItem">
          <Icon type="md-contacts"></Icon>
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>

<script>
  export default {
    name: "editNoteHeader",
    methods:{
      onMenuItem(name){
        if(name==='menuRecipient'){
          this.$router.push({
            name:'recipientList'
          })
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/gogoStyle.css";
</style>
