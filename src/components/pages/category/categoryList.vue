<template>
  <div>
    <CellGroup>
      <CategoryCell v-for="(item, index) in categoryList"
                    :key="index"
                    :category="item">
      </CategoryCell>
    </CellGroup>
    <div v-if="loading">
      <Spin>
        <Icon type="ios-loading" class="gogo_spin"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
  </div>
</template>

<script>
  import {apiListCategory} from "@/api/api";
  import CategoryCell from './categoryListCell'

  export default {
    name: "categoryList",
    components: {
      CategoryCell
    },
    data() {
      return {
        categoryList: [],
        loading: false
      }
    },
    methods: {
      loadAllData() {
        this.loading = true
        apiListCategory({}).then((response) => {
          console.log(response)
          this.loading = false
          if (response.data.code === 0) {
            this.categoryList = response.data.data.categoryList

          } else {

          }
        }).catch((error) => {
          console.log(error)
          this.loading = false
        })
      }
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";

</style>
