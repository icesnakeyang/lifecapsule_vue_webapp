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
                  v-model="item.value"
                  style="width: 100%"></DatePicker>
    </FormItem>
<!--    <Input v-model="setTime"></Input>-->

    <FormItem v-if="paramString" label="Value">
      <Input v-model="item.value"></Input>
    </FormItem>
  </div>
</template>

<script>
  // import moment from 'moment/moment'
  import moment from 'moment-timezone'

  export default {
    name: "gogoKeyParam",
    props: {
      item: {}
    },
    computed: {
      setTime() {
        console.log(1)
        if (this.item) {
          console.log(2)
          if (this.item.value) {
            console.log(3)
            console.log(this.item.value)
            let tt = moment(this.item.value).format('YYYY-MM-DD HH:mm:ss')
            console.log(tt)
            return this.item.value
          }
        }
        console.log(4)
        return ''
      },
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

    mounted() {
      if(this.item.type==='datetime'){
        console.log(this.item.value)
        console.log(moment(this.item.value).format('YYYY-MM-DD HH:mm:ss'))
      }
    }
  }
</script>

<style scoped>

</style>
