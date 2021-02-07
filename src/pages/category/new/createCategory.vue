<template>
  <div>
    <Form>
      <FormItem>
        <Input v-model="categoryName" placeholder="Input new category"></Input>
      </FormItem>
      <FormItem>

        <RadioGroup v-model="noteType">
          <Radio label="普通笔记"></Radio>
          <Radio label="防拖延笔记"></Radio>
        </RadioGroup>

      </FormItem>
      <span v-if="saving">
          <Spin>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Saving</div>
          </Spin>
        </span>
      <span v-else>
          <FormItem>
            <Button type="primary" @click="onCreate" class="gogo_button">Create</Button>
          </FormItem>
        </span>
    </Form>
  </div>
</template>

<script>
  import {apiCreateNoteCategory} from "@/api/api";

  export default {
    name: "createCategory",
    data() {
      return {
        categoryName: '',
        saving: false,
        noteType:null
      }
    },
    methods: {
      onCreate() {
        this.saving = true
        let params={
          categoryName: this.categoryName,
          noteType:this.noteType
        }
        if(this.noteType==='防拖延笔记'){
          params.noteType='CREATIVE_NOTE'
        }else {
          params.noteType='NORMAL'
        }
        apiCreateNoteCategory(params).then((response) => {
          this.saving = false
          if (response.data.code === 0) {
            this.$Message.success('创建成功')
            this.$router.push({
              name: 'categoryList'
            })
          } else {
            this.$Message.error('保存失败')
          }
        }).catch((error) => {
          this.saving = false
        })
      }
    }
  }
</script>

<style scoped>
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  .gogo_button {
    width: 100%;
  }
</style>
