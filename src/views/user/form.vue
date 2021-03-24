<template>
  <div class="form-wrapper mt-normal">
    <parameter />
    <message-form />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MessageForm from '@/components/user/form/message.vue'
import Parameter from '@/components/user/form/parameter.vue'

export default Vue.extend({
  components: {
    MessageForm,
    Parameter
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include form-wrapper();
@include margin();

</style>