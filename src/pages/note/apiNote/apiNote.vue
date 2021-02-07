<template>
  <div>
    <Card>
      <p slot="title">
        {{$t('userData.title1')}}
      </p>
      <p>{{$t('userData.noteTitle')}}: {{title}}</p>
      <p>{{$t('userData.noteTime')}}: {{createTime}}</p>
    </Card>
    <Card style="margin-top: 30px">
      <p slot="title">
        {{$t('userData.title2')}}
      </p>
      <Table :columns="cols1" :data="apiDocs"></Table>
    </Card>
    <div class="bt_view">
      <Button type="primary" @click="makeNoteApi">创建API</Button>
    </div>

  </div>
</template>

<script>
  import {apiConvertToApi, apiGetNoteApi, apiGetNoteTiny} from "../../../api/api";
  import moment from "moment";

  export default {
    name: "apiNote",
    data() {
      return {
        title: '',
        createTime: '',
        apiDocs: [],
        cols1: [
          {
            title: this.$t('userData.params'),
            key: 'param'
          },
          {
            title: this.$t('userData.values'),
            key: 'value'
          }
        ]
      }
    },
    methods: {
      loadAllData() {
        const params = {
          noteId: this.$store.state.note_id
        }
        apiGetNoteTiny(params).then((response) => {
          this.title = response.data.data.title
          this.createTime = moment(response.data.data.createTime).format('YYYY-MM-DD')

          apiGetNoteApi(params).then((response) => {
            this.apiDocs = response.data.data.userDataParams
          })
        }).catch((error) => {
          this.$Message.error(this.$t('syserr.' + error))
        })
      },

      makeNoteApi() {
        let params = {
          noteId: this.$store.state.note_id
        }
        apiConvertToApi(params).then((response) => {
        }).catch((error) => {
          this.$Message.error(this.$t('syserr.' + error))
        })
      }
    },

    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>
  .bt_view {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
</style>
