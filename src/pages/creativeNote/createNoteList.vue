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
      ]
    }
  }
}
</script>

<style scoped>

</style>
