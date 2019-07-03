<template>
  <div>
    <Form>
      <FormItem>
        <Input type="text" v-model="login_name" :placeholder="$t('user.loginNameHolder')">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Input type="password" v-model="password" :placeholder="$t('user.password')">
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
          <Button class="gogo_button" type="primary"
                  @click="onRegister">{{$t('user.btRegister')}}
          </Button>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {apiRegister} from "@/api/api";
  import {apiRequestRSAPublicKey} from "../../../api/api";
  import {RSAencrypt} from "../../../plugins/crypto";

  export default {
    name: "register",
    data() {
      return {
        login_name: '',
        password: '',
        submitting: false
      }
    },
    methods: {
      onRegister() {
        if (!this.login_name) {
          this.$Message.error('Please input correct login name');
          return
        }
        if (!this.password) {
          this.$Message.error('Please input password!');
          return
        }
        /**
         * 判断用户输入时手机还是email
         */
        let email, phone
        const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if (re.test(this.login_name)) {
          email = this.login_name
        } else {
          phone = this.login_name
        }

        let params = {
          phone: phone,
          email: email
        }
        /**
         * 从服务器取一个RSA公钥
         * 用公钥加密密码
         */
        apiRequestRSAPublicKey().then((response) => {
          if (response.data.code === 0) {
            params.password = RSAencrypt(this.password, response.data.data.publicKey)
            params.keyToken = response.data.data.keyToken

            this.submitting = true
            apiRegister(params).then((response) => {
              console.log(response)
              if (response.data.code === 0) {
                const token = response.data.data.user.token
                console.log(token)
                this.$store.dispatch('saveToken', token)
                this.$router.push({
                  name: 'login'
                })
                this.$Message.success(this.$t('user.msgRegisterSuccess'))
              } else {
                this.$Message.error(this.$t('syserr.' + response.data.code))
              }
              this.submitting = false
            }).catch((error) => {
              console.log(error)
              this.$Message.error(error)
              this.submitting = false
            })
          } else {
            this.$Message.error(this.$t('syserr.' + response.data.code))
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";

</style>
