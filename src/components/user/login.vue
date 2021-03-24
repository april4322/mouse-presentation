<template>
  <form @submit.prevent="login" :class="{ error: failed }">
    <div class="row">
      <input type="text" name="username" v-model="username" placeholder="user name" maxlength="15">
    </div>
    <div>
      <button type="submit" class="btn btn-blue">Log In</button> 
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    username: '',
    failed: false,
  }),
  methods: {
    async login(): Promise<void> {
      if(this.username == '') {
        this.failed = true
        window.setTimeout((): void => {
          this.failed = false
        }, 2000)
        return
      }

      const res = await this.$store.dispatch('user/login', { username: this.username })

      if(res.status === 200 && this.$store.getters['user/userId']) {
        this.$router.push('/')
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