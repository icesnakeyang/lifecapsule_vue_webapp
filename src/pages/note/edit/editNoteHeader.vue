<template>
  <div>
    <Header style="padding: 0px">
      <Menu mode="horizontal" theme="dark" active-name="2" @on-select="onMenuItem">
        <MenuItem name="menuBack" class="gogo_menuItem">
          <Icon type="ios-arrow-back"></Icon>
        </MenuItem>
        <MenuItem name="menuTitle" class="gogo_title">
          {{categoryName}}
        </MenuItem>
        <div class="layout-nav" :style="{float:'right'}">
          <MenuItem name="menuMoveFolder" class="gogo_menuItem">
            <Icon type="ios-open-outline"/>
          </MenuItem>
          <MenuItem name="menuPublishNote" class="gogo_menuItem">
            <Icon type="md-share"/>
          </MenuItem>
          <MenuItem name="menuMakeApi" class="gogo_menuItem">
            <span style="font-size: 24px">API</span>
          </MenuItem>
          <MenuItem name="menuTrigger" class="gogo_menuItem">
            <Icon type="ios-locate-outline"/>
          </MenuItem>
          <MenuItem name="menuDelete" class="gogo_menuItem">
            <Icon type="ios-trash-outline"/>
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Modal
      v-model="modalMoveFolder"
      title="移动当前笔记到其它分类"
      @on-ok="moveFolderOk">
      <Row>
        <Col span="6">
          <p>{{currentCategoryName}}</p>
        </Col>
        <Col span="18">
          <div>
            <Card title="选择笔记分类" :padding="0" shadow style="width: 300px;">
              <CellGroup @on-click="onCategory">
                <category-cell v-for="(item,index) in categoryList" :item="item">
                </category-cell>
              </CellGroup>
            </Card>
          </div>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
  import {apiDeleteNote, apiGetNoteTiny, apiListCategory, apiPublishNote} from "../../../api/api";
  import CategoryCell from "./categoryCell";

  export default {
    name: "editNoteHeader",
    components: {CategoryCell},
    data() {
      return {
        modalMoveFolder: false,
        currentCategoryId: '',
        currentCategoryName: '',
        categoryList: []
      }
    },
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
          /**
           * 清除triggerId的缓存，通过读取noteId来读取trigger
           */
          this.$store.dispatch('clearTriggerId')
          this.$router.push({
            name: 'editTrigger'
          })
        }
        if (name === 'menuDelete') {
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
                    name: 'noteList'
                  })
                } else {
                  this.$Message.error(this.$t('common.btDeleteFailed'))
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
        if (name === 'menuPublishNote') {
          this.$router.push({
            name: 'publishNote'
          })
        }
        if (name === 'menuMakeApi') {
          this.$router.push({
            name: 'apiNote'
          })
        }
        if (name === 'menuMoveFolder') {
          this.modalMoveFolder = true
          console.log(this.$store.state)
          let params = {
            noteId: this.$store.state.note_id
          }
          apiGetNoteTiny(params).then((res) => {
            console.log(res)
            this.currentCategoryId = res.data.data.categoryId
            this.currentCategoryName = res.data.data.categoryName
          })

          apiListCategory().then((res) => {
            console.log(res)
            this.categoryList = res.data.data.categoryList
          })
        }
      },
      moveFolderOk() {
        console.log(this.currentCategoryName)
        console.log(this.currentCategoryId)

      },
      onCategory(e){
        console.log(e)
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
