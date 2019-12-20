<template>
  <Header style="padding: 0px">
    <Menu mode="horizontal" theme="dark" active-name="2" @on-select="onMenuItem">
      <MenuItem name="menuBack" class="gogo_menuItem">
        <Icon type="ios-arrow-back"></Icon>
      </MenuItem>
      <MenuItem name="menuTitle" class="gogo_title">
      </MenuItem>
      <div class="layout-nav" :style="{float:'right'}">

      </div>
    </Menu>
  </Header>
</template>

<script>
    export default {
        name: "editNoteHeader",
        computed: {},
        methods: {
            onMenuItem(name) {
                if (name === 'menuBack') {
                    this.$router.back()
                }
            }
        }
    }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
