<template>
  <div class="content">
    <admin-header />
    <section class="table-wrapper mt-normal">
      <viewer-parameter class="mb-normal" />
      <bouyoumi-chan-setting />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdminHeader from '@/components/admin/header.vue'
import ViewerParameter from '@/components/admin/viewer-parameter.vue'
import BouyoumiChanSetting from '@/components/admin/bouyomichan.vue'

export default Vue.extend({
  components: {
    AdminHeader,
    ViewerParameter,
    BouyoumiChanSetting
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include table-wrapper();
@include margin();
@include content();

</style>