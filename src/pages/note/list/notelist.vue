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
    import {apiListNote} from "@/api/api";
    import {apiListNoteByCategory} from "@/api/api";
    import NoteRow from './noteRow'
    import moment from "moment";

    export default {
        name: "notelist",
        components: {
            NoteRow
        },
        data() {
            return {
                noteList: [],
                isColor: true,
                loading: false,
                pageIndex: 1,
                pageSize: 10,
                totalNotes: 0,
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
                ]
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
                        pageSize: this.pageSize,
                        pageIndex: this.pageIndex,
                        categoryId: this.$store.state.category_id
                    }).then((response) => {
                      console.log(response)
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
                            this.$Message.error(this.$t('common.loadDataError'))
                            this.loading = false
                        }
                    }).catch((error) => {
                        this.loading = false
                    })
                }

            },

            goDetail(params) {
                this.$store.dispatch('saveNoteId', params.row.noteId)
                this.$router.push({
                    name: 'editNote',
                    params: {
                        noteId: params.row.noteId
                    }
                })
            },

            pageChange(e) {
                this.pageIndex = e
                this.loadAllData()
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
