<template>

</template>

<script>
  export default {
    name: "modalConfirm",
    methods: {
      confirm() {
        this.$Modal.confirm({
          title: 'Title',
          content: '<p>Content of dialog</p><p>Content of dialog</p>',
          onOk: () => {
            this.$Message.info('Clicked ok');
          },
          onCancel: () => {
            this.$Message.info('Clicked cancel');
          }
        });
      },
      custom() {
        this.$Modal.confirm({
          title: 'Title',
          content: '<p>Content of dialog</p><p>Content of dialog</p>',
          okText: 'OK',
          cancelText: 'Cancel'
        });
      },
      async() {
        this.$Modal.confirm({
          title: 'Title',
          content: '<p>The dialog box will be closed after 2 seconds</p>',
          loading: true,
          onOk: () => {
            setTimeout(() => {
              this.$Modal.remove();
              this.$Message.info('Asynchronously close the dialog box');
            }, 2000);
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
