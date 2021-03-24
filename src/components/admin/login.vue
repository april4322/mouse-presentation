<template>
  <form @submit.prevent="login" :class="{ error: failed }">
    <div class="row">
      <input type="text" name="username" v-model="username" placeholder="user name">
    </div>
    <div class="row">
      <input type="text" name="password" v-model="password" placeholder="password">
    </div>
    <div>
      <button type="submit" class="btn btn-blue">Log In</button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data: () => ({
    username: '',
    password: '',
    failed: false
  }),
  methods: {
    async login(): Promise<void> {
      if(this.username === '' || this.password === '') {
        return
      }

      const res = await axios.post('/api/login', {
        username: this.username,
        password: this.password
      })
      
      if(res.status === 200 && res.data.isAdmin){
        this.$store.dispatch('bouyomichan/init')
        this.$router.push('/admin/index')
      } else {
        this.failed = true
        window.setTimeout((): void => {
          this.failed = false
        }, 2000)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include btn;
@include row;
@include login-form;
@include shake-keyframs;

form {
  width: 280px;
}

input {
  width: 100%;
}

button {
  width: 100%;
}

</style>