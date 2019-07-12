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
                  placeholder="Select date  and time"
                  v-model="item.value"
                  style="width: 100%"></DatePicker>
    </FormItem>

    <FormItem v-if="paramString" label="Value">
      <Input v-model="item.value"></Input>
    </FormItem>
  </div>
</template>

<script>
  export default {
    name: "gogoKeyParam",
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
      paramString(){
        if(this.item.type==='string'){
          return true
        }
        return false
      }
    }
  }
</script>

<style scoped>

</style>
