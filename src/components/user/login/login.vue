<template>
  <div>
    <Form>
      <FormItem prop="user">
        <Input type="text"
               v-model="phone"
               :placeholder="$t('user.loginNameHolder')">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Input type="password" v-model="login_password" :placeholder="$t('user.password')">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <div v-show="submitting">
          <Spin>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <!--<div>{{$t('common.loading')}}</div>-->
          </Spin>
        </div>
        <div v-show="!submitting">
          <Button type="primary" @click="onLogin" style="width: 100%">{{$t('user.btLogin')}}</Button>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {apiLogin} from "@/api/api";

  export default {
    name: "login",
    data() {
      return {
        phone: '',
        email: '',
        login_password: '',
        token: '',
        submitting: false
      }
    },
    methods: {
      autoLogin() {
        this.$router.push({
          name: 'notelist'
        })
      },
      onLogin() {
        const params = {
          phone: this.phone,
          password: this.login_password
        }
        this.submitting = true
        apiLogin(params).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.token = response.data.data.user.token
            this.$store.dispatch('saveToken', this.token)
            this.$router.push({
              name: 'notelist'
            })
          } else {
            this.$Message.error(this.$t('syserr.' + response.data.code))
          }
          this.submitting = false
        }).catch((error) => {
          console.log(error)
          this.submitting = false
        })
      }
    },
    mounted() {
      const token = this.$store.state.gogo_token
      if (token) {
        this.token = token
        this.autoLogin()
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
