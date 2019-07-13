<template>
  <div>
    <Divider></Divider>
    <FormItem label="Type">
      <Input v-model="item.type" readonly></Input>
    </FormItem>
    <FormItem label="Param">
      <Input v-model="item.param" readonly></Input>
    </FormItem>
    <FormItem v-if="paramTime" label="Value">
      <DatePicker :transfer=true type="datetime"
                  placeholder="Select date and time"
                  v-model="theTime"
                  @on-change="onNewTime"
                  style="width: 100%"></DatePicker>
    </FormItem>

    <FormItem v-if="paramString" label="Value">
      <Input v-model="item.value"></Input>
    </FormItem>
  </div>
</template>

<script>
  import moment from 'moment-timezone'

  export default {
    name: "gogoKeyParam",
    data() {
      return {
        theTime: ''
      }
    },
    props: {
      item: {}
    },
    computed: {
      paramTime() {
        if (this.item.type === 'datetime') {
          return true
        }
        return false
      },
      paramString() {
        if (this.item.type === 'string') {
          return true
        }
        return false
      }
    },
    methods: {
      onNewTime() {
        this.item.value = this.theTime
      }
    },

    mounted() {
      if (this.item.type === 'datetime') {
        this.theTime = moment(this.item.value).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>

<style scoped>

</style>
