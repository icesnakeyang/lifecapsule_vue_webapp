<template>
  <div>
    <div>girl list here</div>
    <Form>
      <FormItem>
        <Input type="text" v-model="name" placeholder="pick up girl"></Input>
      </FormItem>
      <FormItem>
        <Input type="text" v-model="age" number placeholder="input age"></Input>
      </FormItem>
    </Form>
    <Button type="error" style="width: 100%" @click="addGirl">Add</Button>
    <girl-row v-for="(item, index) in girls"
              :key="index"
              :girl="item">
    </girl-row>
    <div>
      <Button type="primary" @click="onFirstPage">首页</Button>
      <Button type="primary" @click="onLastPage">上一页</Button>
      <Button type="primary" @click="onNextPage">下一页</Button>
      <Button type="primary" @click="onEndPage">尾页</Button>
    </div>
  </div>
</template>

<script>
  import {apiLogin} from "@/api/api";
  import girlRow from './girlRow'

  export default {
    name: "girlList",
    components: {
      girlRow
    },
    data() {
      return {
        girls: [],
        name: '',
        age: 0,
        totalGirls: 0,
        currentPage: 1
      }
    },
    methods: {
      loadAllData() {
        const urlParams = {
          page: this.currentPage
        }
        apiLogin(urlParams).then((response) => {
          console.log(response)
          console.log(response.data.count)
          if (response.data.results) {
            console.log(1)
            this.girls = response.data.results
          } else {
            console.log(2)
          }
        })
      },

      addGirl() {
        if (!this.name) {
          console.log('no name')
          return
        }
        if (!this.age) {
          console.log('no age')
          return
        }
        apiAddGirl({
          name: this.name,
          age: this.age
        }).then((response) => {
          console.log(response)
          if (response.data) {
            this.loadAllData()
          }
        })
      },

      onFirstPage(){

      },

      onLastPage(){

      },

      onNextPage(){

      },

      onEndPage(){

      }
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
