<template>
  <div>
    <Header style="padding: 0px">
      <Menu mode="horizontal" theme="dark" active-name="2" @on-select="onMenuItem">
        <!--<div class="layout-logo">asdf</div>-->
        <!--<div class="layout-logo">asdfa</div>-->
        <MenuItem name="menuBack" class="gogo_menuItem">
          <Icon type="ios-arrow-back"></Icon>
        </MenuItem>
        <MenuItem name="menuTitle" class="gogo_title">
          Category
        </MenuItem>
        <div class="layout-nav" :style="{float:'right'}">
          <MenuItem name="menuAdd" class="gogo_menuItem">
            <Icon type="md-add"></Icon>
          </MenuItem>
        </div>
      </Menu>
    </Header>
  </div>
</template>

<script>
  export default {
    name: "categoryHeader",
    methods: {
      onMenuItem(name) {
        console.log(name)
        if (name === 'menuBack') {
          this.$router.back()
        }
        if (name === 'menuTitle') {
          console.log('here')
          this.$router.push({
            name: 'notelist'
          })
        }
        if (name === 'menuAdd') {
          this.$router.push({
            name: 'createCategory'
          })
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../../assets/gogoStyle.css'; /*引入公共样式*/

</style>
