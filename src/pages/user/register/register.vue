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

        this.submitting = true
        apiRegister({
          phone: phone,
          email: email,
          password: this.password
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            const token = response.data.data.user.token
            console.log(token)
            this.$store.dispatch('saveToken', token)
            // this.$store.dispatch('saveToken', user);
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
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";

</style>
