<template>
  <div class="content">
    <admin-header />
    <section class="view-wrapper">
      <qr-code />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminHeader from '@/components/admin/header.vue'
import QrCode from '@/components/admin/qrcode.vue'

export default Vue.extend({
  components: {
    AdminHeader,
    QrCode
  },
});
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include view-wrapper();
@include content();

</style>