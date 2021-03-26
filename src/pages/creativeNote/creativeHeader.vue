<template>
  <div>
    <Header style="padding: 0px">
      <Menu mode="horizontal" theme="light" active-name="2" @on-select="onMenuItem">
        <!--<div class="layout-logo">asdf</div>-->
        <!--<div class="layout-logo">asdfa</div>-->
        <MenuItem name="menuBack" class="gogo_menuItem">
          <Icon type="ios-arrow-back"></Icon>
        </MenuItem>
        <MenuItem name="menuTitle" class="gogo_title">
          {{ categoryName }}
        </MenuItem>
        <div class="layout-nav" :style="{float:'right'}">
          <MenuItem name="menuTask" class="gogo_menuItem">
            <Icon type="md-done-all" />
          </MenuItem>
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
import {apiDeleteNote} from "../../api/api";

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
      if (name === 'menuCategory') {
        this.$router.push({
          name: 'categoryList'
        })
      }
      if (name === 'menuAdd') {
        this.$store.dispatch('clearNoteId')
        this.$router.push({
          name: 'creativeNoteEdit'
        })
      }
      if (name === 'menuTask') {
        this.$router.push({
          name: 'taskList'
        })
      }
    }
  }
}
</script>

<style scoped>
@import "../../assets/gogoStyle.css";
</style>
