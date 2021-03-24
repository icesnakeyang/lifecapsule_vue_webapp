<template>
  <div>
    <div>
      <Table :columns="col1" :data="noteList"></Table>
      <div style="margin-top: 10px;">
        <Page :total="totalNotes" @on-change="pageChange"/>
      </div>
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
import moment from "moment";
import {apiListNote} from "../../api/api";

export default {
  name: "creativeNoteList",
  data() {
    return {
      noteList: [],
      col1: [
        {
          title: 'title',
          key: 'title'
        },
        {
          title: 'time',
          key: 'createdTime',
          render: (h, params) => {
            return h('span', moment(params.row.createdTime).format('YYYY-MM-DD HH:mm'))
          }
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.goDetail(params)
                  }
                }
              }, 'View'),
            ])
          }
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      totalNotes: 0,
      loading: true
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
        apiListNote({
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          idc:true,
          categoryId: this.$store.state.category_id
        }).then((response) => {
          if (response.data.code === 0) {
            this.noteList = response.data.data.noteList
            this.totalNotes = response.data.data.totalNote
            this.loading = false
          } else {
            this.$Message.error(this.$t("common.loadDataError"))
            this.loading = false
          }
        }).catch((error) => {
          this.loading = false
        })
      }
    },

    pageChange(e) {
      this.pageIndex = e
      this.loadAllData()
    },

    goDetail(params) {
      this.$store.dispatch('saveNoteId', params.row.noteId)
      this.$router.push({
        name: 'creativeNoteEdit'
      })
    },
  },
  mounted() {
    this.loadAllData()
  }
}
</script>

<style scoped>
@import "../../assets/gogoStyle.css";
</style>
