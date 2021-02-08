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
          <MenuItem name="menuAdd" class="gogo_menuItem">
            <Icon type="md-add"></Icon>
          </MenuItem>
          <MenuItem name="menuDelete" class="gogo_menuItem">
            <Icon type="ios-trash-outline"/>
          </MenuItem>
        </div>
      </Menu>
    </Header>
  </div>
</template>

<script>
import {apiDeleteNote} from "../../api/api";

export default {
  name: "creativeHeaderEdit",
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
        this.$store.dispatch('clearNoteId')
        this.$router.push({
          name: 'creativeNoteEdit'
        })
      }
      if (name === 'menuDelete') {
        let noteId=this.$store.state.note_id
        if(!noteId){
          return
        }
        this.$Modal.confirm({
          title: this.$t('common.modal.delete.title'),
          content: this.$t('common.modal.delete.content'),
          onOk: () => {
            apiDeleteNote({
              noteId: this.$store.state.note_id
            }).then((response) => {
              if (response.data.code === 0) {
                this.$Message.info(this.$t('common.btDeleteSuccess'))
                this.$router.push({
                  name: 'creativeNoteList'
                })
              } else {
                this.$Message.error(this.$t('common.btDeleteFailed'))
              }
            })
          }
        });
      }
    }
  }
}
</script>

<style scoped>
@import "../../assets/gogoStyle.css";
</style>
