<template>
  <div>
    <Form>
      <FormItem>
        <Input v-model="gogoKey.title"></Input>
      </FormItem>
      <FormItem>
        <Input v-model="gogoKey.description"></Input>
      </FormItem>
      <Table :columns="colParams" :data="dataParams"></Table>
      <Button type="success" @click="modalNewParam = true">Add Param</Button>

      <Button type="primary" @click="btSaveGogoPublicKey">Save gogoPublic Key</Button>
    </Form>

    <Modal v-model="modalEditParam"
           title="Edit Param"
           @on-ok="modalEditParam_onOk"
           @on-cancel="modalEditParam_onCancel">
      <Form :label-width="80">
        <FormItem label="Type">
          <Input v-model="editParam.type"></Input>
        </FormItem>
        <FormItem label="Param">
          <Input v-model="editParam.param"></Input>
        </FormItem>
        <FormItem label="Value">
          <Input v-model="editParam.value"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modalNewParam"
           title="Add New Param"
           @on-ok="modalNewParam_onOk"
           @on-cancel="modalNewParam_onCancel">
      <Form :label-width="80">
        <FormItem label="Type">
          <Input v-model="newParam.type"></Input>
        </FormItem>
        <FormItem label="Param">
          <Input v-model="newParam.param"></Input>
        </FormItem>
        <FormItem label="Value">
          <Input v-model="newParam.value"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {apiGetGogoPublicKey} from "../../api/api";
  import gogoPublicKeyEditParam from "./gogoPublicKeyEditParam"

  export default {
    name: "gogoPublicKeyEdit",
    components: {
      gogoPublicKeyEditParam
    },
    data() {
      return {
        gogoKey: {},
        colParams: [
          {
            title: 'Type',
            key: 'type'
          },
          {
            title: 'Param',
            key: 'param'
          },
          {
            title: 'Value',
            key: 'value'
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
                      console.log(params.row)
                      this.editParam = params.row
                      console.log(this.param)
                      this.modalEditParam = true
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
              ])
            }
          }
        ],
        modalEditParam: false,
        modalNewParam: false,
        dataParams: [],
        editParam: {},
        newParam: {},
        test: [],
        idd: 1
      }
    },
    methods: {
      loadAllData() {
        apiGetGogoPublicKey({
          gogoPublicKeyId: this.$route.params.gogoPublicKeyId
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.gogoKey = response.data.data.key
            this.dataParams = this.gogoKey.params
          }
        })
      },

      modalEditParam_onOk() {
        console.log(this.param)
        console.log(this.gogoKey.params.type)
        this.dataParams[1] = this.editParam
        console.log(this.dataParams)

      },

      modalEditParam_onCancel() {
        console.log(this.test)
        this.test.push({
          a: this.idd
        })
        this.idd++

      },

      modalNewParam_onOk() {
        this.dataParams.push({
          param: this.newParam.param,
          type: this.newParam.type,
          value: this.newParam.value
        })
      },

      modalNewParam_onCancel() {

      },

      btSaveGogoPublicKey() {
        console.log(this.gogoKey)
      }
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
