<template>
  <table>
    
    <thead>
      <tr>
        <th class="column-10">No</th>
        <th class="column-20">User Name</th>
        <th class="column-50">Message</th>
        <th class="column-20">Posted At</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="message in messages" :key="message.id">
        <td>{{ message.id }}</td>
        <td>{{ message.name }}</td>
        <td>{{ message.content }}</td>
        <td>{{ message.createdAt }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data: () => ({
    messages: Array
  }),
  methods: {
    async history() {
      const res = await axios.get('/api/admin/history')
      this.messages = res.data.messages
    }
  },
  mounted() {
    this.history()
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include column-size;
@include table;

</style>