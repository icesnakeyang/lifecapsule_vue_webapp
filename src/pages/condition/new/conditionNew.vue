<template>
  <div>
    <Form>
      <FormItem label="触发条件名称">
        <Input type="text" v-model="conditionName" placeholder="condition name"></Input>
      </FormItem>
      <FormItem label="触发类型">
        <Select v-model="conditionKey" style="width:100%">
          <Option v-for="(item,index) in conditions"
                  :value="item.key"
                  :key="index">{{ item.key }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="触发时间">
        <date-pick class="gogo_input"
                   v-model="conditionValueDate"
                   :pickTime="true"
                   :format="'YYYY-MM-DD HH:mm'"
        ></date-pick>
      </FormItem>
      <FormItem>
        <Input type="text" v-model="remark" placeholder="remark"></Input>
      </FormItem>
    </Form>
    <Button class="gogo_button" type="primary" @click="addCondition">ok</Button>
  </div>
</template>

<script>
  import {apiAddCondition} from "../../../api/api";
  import DatePick from 'vue-date-pick';
  import 'vue-date-pick/dist/vueDatePick.css';

  export default {
    name: "conditionNew",
    components: {
      DatePick
    },
    data() {
      return {
        conditionName: '',
        conditionKey: '',
        conditionValueDate: '',
        conditions: [
          {
            key: '时间'
          }
        ],
        remark: ''
      }
    },
    methods: {
      addCondition() {
        console.log(this.conditionName)
        console.log(this.conditionKey)
        const theDate = new Date(this.conditionValueDate);
        console.log(theDate)
        apiAddCondition({
          triggerId: this.$store.state.trigger_id,
          conditionName: this.conditionName,
          conditionKey: this.conditionKey,
          conditionTime: theDate,
          remark: this.remark
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.$Message.success('Add success')
            this.$router.back()
          }
        })
      }
    },
    mounted() {
      console.log('trigger id：' + this.$store.state.trigger_id)
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";

  .gogo_input {
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    border: 1px solid #dcdee2;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
  }
</style>
