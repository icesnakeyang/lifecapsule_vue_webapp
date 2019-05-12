<template>
  <div>
    <Form>
      <FormItem>
        <Input type="text" v-model="name" placeholder="condition name"></Input>
      </FormItem>
    </Form>
    <date-pick class="gogo_input" v-model="triggerDate"></date-pick>
  </div>
</template>

<script>
  import DatePick from 'vue-date-pick';
  import 'vue-date-pick/dist/vueDatePick.css';

  export default {
    name: "conditionNew",
    components: {
      DatePick
    },
    data: () => ({
      name: '',
      triggerDate: '',


    }),
    mounted() {
      console.log('trigger id：' + this.$store.state.trigger_id)

    }
  }
</script>

<style scoped>
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
