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
  import {apiGetGogoPublicKey, apiUpdateGogoPublicKey} from "../../api/api";
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
                      this.editParam = params.row
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
                      this.dataParams.splice([params.row._index], 1)
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
        newParam: {}
      }
    },
    methods: {
      loadAllData() {
        console.log(this.$route.params.gogoKeyId)
        apiGetGogoPublicKey({
          gogoKeyId: this.$route.params.gogoKeyId
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.gogoKey = response.data.data.key
            this.dataParams = this.gogoKey.keyParams
            console.log(this.dataParams)
          }
        })
      },

      modalEditParam_onOk() {
        let param = {
          type: this.editParam.type,
          param: this.editParam.param,
          value: this.editParam.value
        }
        this.dataParams[this.editParam._index] = param
      },

      modalEditParam_onCancel() {

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
        // this.gogoKey.params = this.dataParams
        console.log(this.gogoKey)
        apiUpdateGogoPublicKey({
          gogoKeyId: this.gogoKey.gogoKeyId,
          title: this.gogoKey.title,
          keyParams: this.gogoKey.keyParams,
          description: this.gogoKey.description
        }).then((response) => {
        })
      }
    },
    mounted() {
      console.log(this.$route.params.gogoKeyId)
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
