<template>
  <div class="content">
    <admin-header />
    <section class="table-wrapper">
      <message-history />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminHeader from '@/components/admin/header.vue'
import MessageHistory from '@/components/admin/history.vue'

export default Vue.extend({
  components: {
    AdminHeader,
    MessageHistory
  },
});
</script>


<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include table-wrapper();
@include content();

</style>