<template>
  <div>
    <Cell class="cell_view">
      <div @click="onCategoryCell" class="cell_view2">
      {{item.categoryName}}
      </div>
    </Cell>
  </div>

</template>

<script>
  export default {
    name: "categoryCell",
    props: {
      item: {}
    },
    methods:{
      onCategoryCell(){
        console.log('11')
        console.log(this.item.categoryName)
      }
    }
  }
</script>

<style scoped>
.cell_view{
  width: 100%;
  background: red;
}.
 cell_view2{
  width: 100%;
  background: yellow;
}
</style>
