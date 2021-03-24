<template>
  <table>

    <thead>
      <tr>
        <th class="column-20">No</th>
        <th class="column-80">User Name</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data: () => ({
    users: Array
  }),
  methods: {
    async loginUsers() {
      const res = await axios.get('/api/admin/users')
      this.users = res.data.users
    }
  },
  mounted() {
    this.loginUsers()
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include column-size;
@include table;

</style>