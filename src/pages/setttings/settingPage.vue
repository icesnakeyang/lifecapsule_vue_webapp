<template>
  <div>
    <Card>
      <p slot="title">
        用户：{{this.user.nickname}}
      </p>
      <p>email:{{this.user.email}}</p>
      <p>phone:{{this.user.phone}}</p>
    </Card>
    <CellGroup @on-click="onCellClick">
      <Cell name="changeLoginPassword" :title="$t('settings.changeLoginPassword')"/>
    </CellGroup>
  </div>
</template>

<script>
    import {apiGetUserByToken} from "../../api/api";

    export default {
        name: "settingPage",
        data() {
            return {
                user: {}
            }
        },
        methods: {
            loadAllData() {
                apiGetUserByToken({}).then((response) => {
                    if (response.data.code === 0) {
                        this.user = response.data.data.userInfo
                    }
                    console.log(this.user)
                })
            },
            onCellClick(name) {
                console.log(name)
                if (name === 'changeLoginPassword') {
                    this.$router.push({
                        name: 'changeLoginPassword'
                    })
                }
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
