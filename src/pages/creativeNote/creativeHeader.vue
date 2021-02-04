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
          {{ categoryName }}
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
  name: "creativeHeader",
  computed: {
    categoryName() {
      if (this.$store.state.category_name) {
        return this.$store.state.category_name
      } else {
        return this.$t('headerBar.appName')
      }
    }
  },
  methods: {
    onMenuItem(name) {
      if (name === 'menuBack') {
        this.$router.back()
      }
      if (name === 'menuAdd') {
        this.$router.push({
          name: 'creativeNoteEdit'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
