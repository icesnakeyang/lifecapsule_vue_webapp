<template>
  <div>
    <div>create new gogokey</div>
    <Form>
      <FormItem label="Title">
        <Input type="text" v-model="gogoKey.title" placeholder="title"></Input>
      </FormItem>
      <FormItem label="Type">
        <Input type="text" v-model="gogoKey.type" placeholder="type"></Input>
      </FormItem>
      <FormItem label="Params">
        <Input type="text" v-model="gogoKey.params" placeholder="参数"></Input>
      </FormItem>
      <FormItem label="Values">
        <Input type="text" v-model="gogoKey.values" placeholder="值"></Input>
      </FormItem>
      <FormItem label="Description">
        <Input type="text" v-model="gogoKey.description" placeholder="描述"></Input>
      </FormItem>
      <!--_id;-->
      <!--private String gogoKeyId;-->
      <!--private String name;-->
      <!--private String type;-->
      <!--//triggerTime设置一个触发时间，即到时间就直接触发-->
      <!--private Date triggerTime;-->
      <!--private String url;-->
      <!--private Object params;-->
      <!--private Object values;-->
      <!--private String description;-->
    </Form>
    <Button type="primary" @click="btCreate">Create</Button>
  </div>
</template>

<script>
  import {apiCreateGogoPublicKey} from "../../api/api";

  export default {
    name: "new",
    data() {
      return {
        gogoKey: {}
      }
    },
    methods: {
      btCreate() {
        console.log('create gogokey')
        const keyvalus = {
          date: '2019-4-2',
          month: '4'
        }
        const params = {
          title: this.gogoKey.title,
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
