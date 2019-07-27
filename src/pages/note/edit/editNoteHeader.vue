<template>
  <Header style="padding: 0px">
    <Menu mode="horizontal" theme="dark" active-name="2" @on-select="onMenuItem">
      <MenuItem name="menuBack" class="gogo_menuItem">
        <Icon type="ios-arrow-back"></Icon>
      </MenuItem>
      <MenuItem name="menuTitle" class="gogo_title">
        {{categoryName}}
      </MenuItem>
      <div class="layout-nav" :style="{float:'right'}">
        <MenuItem name="menuTrigger" class="gogo_menuItem">
          <Icon type="ios-locate-outline"/>
        </MenuItem>
        <MenuItem name="menuDelete" class="gogo_menuItem">
          <Icon type="ios-trash-outline"/>
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>

<script>
  import {apiDeleteNote} from "../../../api/api";

  export default {
    name: "editNoteHeader",
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
        if (name === 'menuTrigger') {
          this.$store.dispatch('clearTriggerId')
          this.$router.push({
            name: 'editTrigger'
          })
        }
        if (name === 'menuDelete') {
          console.log('delete')
          this.$Modal.confirm({
            title: 'Title',
            content: '<p>Confirm to delete this note?</p>',
            onOk: () => {
              console.log(this.$store.state)
              apiDeleteNote({
                noteId: this.$store.state.note_id
              }).then((response) => {
                console.log(response)
                if (response.data.code === 0) {
                  this.$Message.info('Delete successful');
                  this.$router.push({
                    name: 'noteList'
                  })
                } else {
                  this.$Message.error('Delete failed');
                }
              })
            }
          });
        }
        if (name === 'menuTitle') {
          this.$router.push({
            name: 'noteList'
          })
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
