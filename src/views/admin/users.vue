<template>
  <div class="content">
    <admin-header />
    <section class="table-wrapper">
      <login-users />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdminHeader from '@/components/admin/header.vue'
import LoginUsers from '@/components/admin/users.vue'

export default Vue.extend({
  components: {
    AdminHeader,
    LoginUsers
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include table-wrapper();
@include content();

</style>