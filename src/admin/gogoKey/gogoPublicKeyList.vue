<template>
  <div>
    <div>
      <Table :columns="columns1" :data="gogoKey"></Table>
    </div>
  </div>
</template>

<script>
  import {apiListGogoPublicKey} from "../../api/api";

  export default {
    name: "gogoPublicKeyList",
    data() {
      return {
        gogoKey: [],
        columns1: [
          {
            title: 'Title',
            key: 'title',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.title)
              ]);
            }
          },
          {
            title: 'Description',
            key: 'description'
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
                      console.log('edit')
                      console.log(params.row.gogoPublicKeyId)
                      this.$router.push({
                        name: 'gogoPublicKeyEdit',
                        params: {
                          gogoPublicKeyId: params.row.gogoPublicKeyId
                        }
                      })
                    }
                  }
                }, 'Edit'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log('delete')
                      console.log(params.row.gogoPublicKeyId)
                    }
                  }
                }, 'Delete')
              ]);
            }
          }
        ]
      }
    },
    methods: {
      loadAllData() {
        apiListGogoPublicKey({}).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.gogoKey = response.data.data.gogoPublicKeyList
            console.log(this.gogoKey)
          }
        })
      }
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
