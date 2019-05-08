<template>
  <div>
    <Form>
      <FormItem>
        <Input v-model="categoryName"></Input>
      </FormItem>

      <span v-if="saving">
        <Spin>
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>Saving</div>
        </Spin>
      </span>
      <span v-else>
        <FormItem>
          <Button type="primary" @click="onUpdate" class="gogo_button" style="float: left">Update</Button>
          <Button type="error" @click="onDelete" class="gogo_button" style="float: right">Delete</Button>
        </FormItem>
      </span>
    </Form>
  </div>
</template>

<script>
  import {apiUpdateNoteCategory} from "@/api/api";
  import {apiDeleteCategory} from "@/api/api";

  export default {
    name: "categoryEdit",
    data() {
      return {
        categoryName: '',
        categoryId: '',
        saving: false
      }
    },
    methods: {
      onUpdate() {
        if (this.categoryId) {
          this.saving = true
          apiUpdateNoteCategory({
            categoryId: this.categoryId,
            categoryName: this.categoryName
          }).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              this.$Message.success('Save access')
            } else {
              this.$Message.error('Save failed')
            }
            this.saving = false
          }).catch((error) => {
            console.log(error)
            this.saving = false
          })
        }
      },

      onDelete() {
        if (!this.categoryId) {
          return
        }
        this.saving = true
        apiDeleteCategory({
          categoryId: this.categoryId
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.$Message.success('Delete success')
            this.$router.push({
              name: 'categoryList'
            })
          } else {
            this.$Message.error('Delete failed')
          }
          this.saving = false
        }).catch((error) => {
          console.log(error)
          this.saving = false
        })
      }
    },

    mounted() {
      if (this.$route.params.categoryName) {
        this.categoryName = this.$route.params.categoryName
        this.categoryId = this.$route.params.categoryId
      }
    }
  }
</script>

<style scoped>
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

</style>
