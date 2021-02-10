<template>
  <div>
    <Header style="padding: 0px">
      <Menu mode="horizontal" theme="light" active-name="2" @on-select="onMenuItem">
        <MenuItem name="menuBack" class="gogo_menuItem">
          <Icon type="ios-arrow-back"></Icon>
        </MenuItem>
        <MenuItem name="menuTitle" class="gogo_title">
          我的任务
        </MenuItem>
        <div class="layout-nav" :style="{float:'right'}">
          <MenuItem name="menuCategory" class="gogo_menuItem">
            <Icon type="ios-folder"></Icon>
          </MenuItem>
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
  name: "taskMindHeader",
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
      if (name === 'menuCategory') {
        this.$router.push({
          name: 'categoryList'
        })
      }
      if (name === 'menuAdd') {
        this.$store.dispatch('clearTaskId')
        this.$router.push({
          name: 'taskMindNew'
        })
      }
    }
  }
}
</script>

<style scoped>
@import "../../../assets/gogoStyle.css";
</style>
