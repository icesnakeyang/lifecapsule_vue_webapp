<template>
  <div>
    <Header :style="{position: 'fixed', width: '100%', 'z-index':1, padding:'0px'}">
      <Menu mode="horizontal" theme="dark" active-name="2" @on-select="onMenuItem">
        <!--<div class="layout-logo">asdf</div>-->
        <!--<div class="layout-logo">asdfa</div>-->
        <!--<MenuItem name="menuBack" class="gogo_menuItem">-->
          <!--<Icon type="ios-arrow-back"></Icon>-->
        <!--</MenuItem>-->
        <MenuItem name="menuTitle" class="gogo_title">
          {{$t("headerBar.appName")}}
        </MenuItem>
        <div class="layout-nav" :style="{float:'right'}">
          <MenuItem name="menuRegister" class="gogo_menuItem_text">
            {{$t('headerBar.menu.register')}}
          </MenuItem>
        </div>
      </Menu>
    </Header>
  </div>
</template>

<script>
  export default {
    name: "loginHeader",
    methods: {
      onMenuItem(name) {
        console.log(name)
        if (name === 'menuRegister') {
          this.$router.push({
            name: 'register'
          })
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
  @import "../../assets/gogoStyle.css";

</style>
