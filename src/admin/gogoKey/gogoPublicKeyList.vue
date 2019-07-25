<template>
  <div>
    <div>
      <Table :columns="columns1" :data="gogoKey"></Table>
    </div>
  </div>
</template>

<script>
  import {apiDeleteGogoPublicKey, apiListGogoPublicKey} from "../../api/api";

  export default {
    name: "gogoPublicKeyList",
    components: {},
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
                      console.log(params.row.gogoKeyId)
                      this.$router.push({
                        name: 'gogoPublicKeyEdit',
                        params: {
                          gogoKeyId: params.row.gogoKeyId
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
                      console.log(params.row.gogoPublicKeyId)
                      this.$Modal.confirm({
                        title: 'Title',
                        content: '<p>Are you sure?</p>',
                        onOk: () => {
                          this.$Message.info('Clicked ok');
                          apiDeleteGogoPublicKey({
                            gogoPublicKeyId: params.row.gogoPublicKeyId
                          }).then((response) => {
                            console.log(response)
                          })
                        },
                        onCancel: () => {
                        }
                      });
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
          if (response.data.code === 0) {
            this.gogoKey = response.data.data.gogoPublicKeyList
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
