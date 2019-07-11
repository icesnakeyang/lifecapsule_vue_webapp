<template>
  <div>
    <Form>
      <FormItem>
        <Input v-model="gogoKey.title"></Input>
      </FormItem>
      <FormItem>
        <Input v-model="gogoKey.description"></Input>
      </FormItem>
      <gogo-public-key-edit-param v-for="(item, index) in gogoKey.params"
                                  :row="item"
                                  :key="index">
      </gogo-public-key-edit-param>
      <Button type="success" @click="btAddParam">Add Param</Button>

      <Button type="primary" @click="btSaveGogoPublicKey">Save gogoPublic Key</Button>
    </Form>

    <Modal v-model="modal1"
           title="Common Modal dialog box title"
           @on-ok="ok"
           @on-cancel="cancel">

    </Modal>
  </div>
</template>

<script>
  import {apiGetGogoPublicKey} from "../../api/api";
  import gogoPublicKeyEditParam from "./gogoPublicKeyEditParam"

  export default {
    name: "gogoPublicKeyEdit",
    components: {
      gogoPublicKeyEditParam
    },
    data() {
      return {
        gogoKey: {}
      }
    },
    methods: {
      loadAllData() {
        apiGetGogoPublicKey({
          gogoPublicKeyId: this.$route.params.gogoPublicKeyId
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.gogoKey = response.data.data.key
          }
        })
      },

      btAddParam(){

      },

      btSaveGogoPublicKey() {
        console.log(this.gogoKey)
      }
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
