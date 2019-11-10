<template>
  <div>
    <Card>
      <p slot="title">
        {{$t('settings.userName')}}：{{this.user.nickname}}
      </p>
      <p>{{$t('settings.email')}}:{{this.user.email}}</p>
      <p>{{$t('settings.phone')}}:{{this.user.phone}}</p>
    </Card>
    <div style="margin-top: 20px; background-color: #dddddd">
      <CellGroup @on-click="onCellClick">
        <Cell name="changeLoginPassword" :title="$t('settings.changeLoginPassword')"/>
      </CellGroup>
    </div>
    <div style="margin-top: 20px; background-color: #dddddd">
      <CellGroup @on-click="onCellClick">
        <Cell name="changeUser" :title="$t('settings.changeUser')"/>
      </CellGroup>
    </div>
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
                if (name === 'changeUser') {
                    console.log('login')
                    this.$store.dispatch('clearToken')
                    this.$router.push({
                        name: 'login'
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
