<template>
  <div>
    <Row class="gogo_row">
      <Col :xs="22" :sm="22" :md="22" :lg="22">
        <Button type="primary" @click="onClick"
                size="small"
        >{{recipient.recipientName}}
        </Button>
      </Col>
      <Col :xs="2" :sm="2" :md="2" :lg="2">
        <a href="#" @click="onDelete">
          <Icon class="gogo_list_icon" type="md-close"/>
        </a>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {apiDeleteRecipient} from "../../../api/api";

  export default {
    name: "recipientRow",
    props: {
      recipient: {}
    },
    methods: {
      onClick() {
        this.$router.push({
          name: 'editRecipient',
          params: {
            recipientId: this.recipient.recipientId
          }
        })
      },
      onDelete() {
        apiDeleteRecipient({
          recipientId: this.recipient.recipientId
        }).then((response) => {
          if (response.data.code === 0) {
            this.$Message.success(this.$t('common.btDeleteSuccess'))
            // location.reload()
            this.$router.replace({
              name: 'allBlank'
            })
          } else {
            this.$Message.error(this.$t('common.btDeleteFailed'))
          }
        })
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
