<template>
  <div>
    <Card>
      <p slot="title">
        <a @click="onClickTitle">{{note.title}}</a>
      </p>
      <p>{{createTime}}</p>
    </Card>
  </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "publicNoteListRow",
        props: {
            note: {}
        },
        computed: {
            createTime() {
                if (this.note.createTime) {
                    return moment(this.note.createTime).format('YYYY-MM-DD')
                }
                return ''
            }
        },
        methods: {
            onClickTitle() {
                console.log(this.note)
                this.$router.push({
                    path: 'publicNoteDetail?noteId=' + this.note.noteId
                })
            }
        }
    }
</script>

<style scoped>

</style>
