<template>
  <div>
    <public-note-list-row v-for="(item, index) in noteList"
                          :key="index"
                          :note="item">
    </public-note-list-row>
  </div>
</template>

<script>
    import {apiListPublicNote} from "../../../api/api";
    import publicNoteListRow from "./publicNoteListRow";

    export default {
        name: "publicNoteListView",
        components: {
            publicNoteListRow
        },
        data() {
            return {
                noteList: []
            }
        },
        methods: {
            loadAllData() {
                apiListPublicNote({}).then((response) => {
                    if (response.data.code === 0) {
                        this.noteList = response.data.data.publicNotes
                    } else {
                        this.$Message.error('common.loadDataError')
                    }
                })
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
