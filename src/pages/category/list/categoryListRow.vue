<template>
  <div>
    <Row>
      <Col :xs="22">
        <span @click="onCell">
      <cell :title="category.categoryName">
    </cell>
    </span>
      </Col>
      <Col :xs="2" class="gogo_cell">
        <span>
      <Icon type="md-settings" @click="onEdit" style="font-size: 18px;float: right"/>
    </span>
      </Col>
    </Row>

  </div>
</template>

<script>
export default {
  name: "categoryListRow",
  props: {
    category: {}
  },
  methods: {
    onCell() {
      this.$store.dispatch('saveCategory', this.category)
      console.log(this.category)
      if (this.category.noteType === 'CREATIVE_NOTE') {
        this.$router.push({
          name: 'creativeNoteList'
        })
      } else {
        this.$router.push({
          name: 'noteList'
        })
      }
    },

    onEdit() {
      this.$router.push({
        name: 'categoryEdit',
        params: {
          categoryName: this.category.categoryName,
          categoryId: this.category.categoryId
        }
      })
    },
  }
}
</script>

<style scoped>
.gogo_cell {
  osition: relative;
  top: 50%;
  transform: translateY(50%);
}
</style>
