<template>
  <Form :label-width="80">
    <FormItem :label="$t('settings.btNewPassword')">
      <Input v-model="newPassword" :placeholder="$t('settings.btNewPasswordHolder')"></Input>
    </FormItem>
    <Button @click="btSavePassword" type="primary" long>{{$t('settings.btChangePassword')}}</Button>
  </Form>
</template>

<script>
    import {apiSaveLoginPassword} from "../../api/api";

    export default {
        name: "changeLoginPassword",
        data() {
            return {
                newPassword: ''
            }
        },
        methods: {
            btSavePassword() {
                let params = {
                    password: this.newPassword
                }
                apiSaveLoginPassword(params).then((response) => {
                    if (response.data.code === 0) {
                        this.$Message.info(this.$t('settings.tipChangePasswordSuccess'))
                        this.$router.push({
                            name: 'settingPage'
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

</style>
