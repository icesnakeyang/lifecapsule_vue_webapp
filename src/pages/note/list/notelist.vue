<template>
  <div>
    <div>
      <note-row v-for="(item, index) in noteList"
                :key="index"
                :note="item"
      ></note-row>
      <router-view></router-view>
    </div>
    <BackTop :height="100" :bottom="50">
      <div>
        <Icon type="md-arrow-dropup-circle"/>
      </div>
    </BackTop>
    <ul>
      <div v-if="loading">
        <Spin>
          <Icon type="ios-loading" class="gogo_spin"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
    </ul>
  </div>
</template>

<script>
  import {apiListNote} from "@/api/api";
  import {apiListNoteByCategory} from "@/api/api";
  import NoteRow from './noteRow'

  export default {
    name: "notelist",
    components: {
      NoteRow
    },
    data() {
      return {
        noteList: [],
        isColor: true,
        loading: false
      }
    },
    methods: {
      loadAllData() {
        /**
         * 检查当前用户是否有选择的分类，
         * 如果没有就按时间倒序读取用户最近的笔记
         */
        this.loading = true
        if (this.$store.state.category_id) {
          //有分类，查询该分类下的笔记
          apiListNoteByCategory({
            pageSize: 10,
            pageIndex: 1,
            categoryId: this.$store.state.category_id
          }).then((response) => {
            if (response.data.code === 0) {
              this.noteList = response.data.data.noteList
              this.loading = false
            } else {
              this.$Message.error("Load data error")
              this.loading = false
            }
          }).catch((error) => {
            this.loading = false
          })
        } else {
          //没有分类，按时间倒序读取笔记
          apiListNote({
            pageSize: 10,
            pageIndex: 1
          }).then((response) => {
            if (response.data.code === 0) {
              this.noteList = response.data.data.noteList
              this.loading = false
            } else {
              this.$Message.error('Load data error')
              this.loading = false
            }
          }).catch((error) => {
            this.loading = false
          })
        }

      }

    },

    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
