<template>
  <Header style="padding: 0px">
    <Menu mode="horizontal" theme="light" active-name="2" @on-select="onMenuItem">
      <MenuItem name="menuBack" class="gogo_menuItem">
        <Icon type="ios-arrow-back"></Icon>
      </MenuItem>
      <MenuItem name="menuNoteList" class="gogo_title">
        {{$t("headerBar.noteList")}}
      </MenuItem>
      <div class="layout-nav" :style="{float:'right'}">
        <MenuItem name="menuAddTrigger" class="gogo_menuItem">
          <Icon type="ios-trash-outline"/>
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>

<script>
  import {apiDeleteTrigger} from "../../../api/api";

  export default {
    name: "triggerListHeader",
    methods: {
      onMenuItem(name) {
        if (name === 'menuBack') {
          this.$router.back()
        }
        if (name === 'menuNoteList') {
          this.$router.push({
            name: 'noteList'
          })
        }
        if (name === 'menuAddTrigger') {
          this.$Modal.confirm({
            title: this.$t('common.modal.delete.title'),
            content: this.$t('common.modal.delete.content'),
            onOk: () => {
              apiDeleteTrigger({
                triggerId: this.$store.state.trigger_id
              }).then((response) => {
                if (response.data.code === 0) {
                  this.$Message.success(this.$t('common.btDeleteSuccess'))
                  this.$router.push({
                    name: 'editNote'
                  })
                } else {
                  this.$Message.error(this.$t('syserr.' + response.data.code));
                }
              })
            },
            onCancel: () => {

            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
