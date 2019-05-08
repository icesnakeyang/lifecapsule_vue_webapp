<template>
  <div>
    <div class="gogo_note_row">
      <div @click="onNote">
      <span class="gogo_note_list_title">
        {{note.title}}
      </span>
        <p>
          <!--<div v-html="note.content"></div>-->
        <p>{{createTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "noteRow",
    props: {
      note: {}
    },
    computed: {
      createTime() {
        return moment(this.note.created_time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    methods: {
      onNote() {
        console.log(this.note.noteId)
        this.$router.push({
          name: 'editNote',
          params: {
            noteId: this.note.noteId
          }
        })
      }
    }
  }
</script>

<style scoped>
  .gogo_note_row {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #bbbbbb;
  }

  .gogo_note_list_title {
    font-size: 14px;
    font-weight: bold;
  }
</style>
