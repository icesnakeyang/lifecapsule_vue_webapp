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
      <Tabs>
        <TabPane label="参数配置">
          <Form label-position="right" :label-width="100">
            <div v-for="(item,index) in params">
              <Row>
                <Col :xs="2" :sm="4" :md="6" :lg="8">
                  <FormItem label="Param">
                    <Input v-model="item.param"></Input>
                  </FormItem>
                </Col>
                <Col :xs="20" :sm="16" :md="12" :lg="8">
                  <Button type="error">del</Button>
                </Col>
                <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
              </Row>
              <Row>
                <Col :xs="2" :sm="4" :md="6" :lg="8">
                  <FormItem label="Value">
                    <Input v-model="item.value"></Input>
                  </FormItem>
                </Col>
                <Col :xs="20" :sm="16" :md="12" :lg="8">
                  <Button type="error">del</Button>
                </Col>
                <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
              </Row>
            </div>
          </Form>
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
      @on-cancel="modalOnCancel">
      <Form>
        <FormItem label="Type">
          <Input v-model="modalType"></Input>
        </FormItem>
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
        modalValue: '',
        modalType: ''
      }
    },
    methods: {
      modalOnConfirm() {
        this.params.push({
          param: this.modalParam,
          value: this.modalValue,
          type: this.modalType
        })
        this.modalParam = ''
        this.modalValue = ''
        this.modalType = ''
      },

      modalOnCancel() {
      },

      btCreate() {
        const keyvalus = {
          date: '2019-4-2',
          month: '4'
        }
        const params = {
          title: this.gogoKey.title,
          description: this.gogoKey.description,
          params: this.params
        }

        apiCreateGogoPublicKey(params).then((response) => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
