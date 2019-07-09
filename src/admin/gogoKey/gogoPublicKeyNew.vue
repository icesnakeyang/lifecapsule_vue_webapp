<template>
  <div>
    <div>create new gogokey</div>
    <Form>
      <FormItem label="Title">
        <Input type="text" v-model="gogoKey.title" placeholder="title"></Input>
      </FormItem>
      <FormItem label="Description">
        <Input type="text" v-model="gogoKey.description" placeholder="描述"></Input>
      </FormItem>
      <FormItem label="Params">
        <Input type="text" v-model="gogoKey.params" placeholder="参数"></Input>
      </FormItem>
      <FormItem label="Values">
        <Input type="text" v-model="gogoKey.values" placeholder="值"></Input>
      </FormItem>
      <Tabs>
        <TabPane label="参数配置">
          <Button type="primary" @click="modalNewParam = true">Add</Button>

        </TabPane>
      </Tabs>
    </Form>
    <Button type="primary" @click="btCreate">Create</Button>

    <Modal
      title="Add New Param"
      v-model="modalNewParam"
      :mask-closable="false"
      @on-ok="modalOnConfirm"
      @on-cancel="modalOnCancel"
    >
      <Form>
        <FormItem label="Param">
          <Input v-model="modalParam"></Input>
        </FormItem>
        <FormItem label="Value">
          <Input v-model="modalValue"></Input>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
  import {apiCreateGogoPublicKey} from "../../api/api";

  export default {
    name: "gogoPublicKeyNew",
    data() {
      return {
        gogoKey: {},
        params: [],
        modalNewParam: false,
        modalParam: '',
        modalValue: ''
      }
    },
    methods: {
      modalOnConfirm() {
        console.log('confirm')
      },

      modalOnCancel() {
        console.log('cancel')
      },

      btCreate() {
        const keyvalus = {
          date: '2019-4-2',
          month: '4'
        }
        const params = {

          title: this.gogoKey.title,
          description: this.gogoKey.description,
          params: [{
            key: 'time',
            value: '2019-7-21'
          }, {
            key: 'year',
            value: '2010'
          }, {
            key: 'week',
            value: 50
          }]
        }
        apiCreateGogoPublicKey(params).then((response) => {
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>

</style>
