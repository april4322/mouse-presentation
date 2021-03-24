<template>
  <section class="message-form">
    <div class="row">
      <stamp-list @useStamp="useStamp($event)" />
    </div>

    <div class="row form">
      <form @submit.prevent="post">
        <div class="row">
          <input type="text" v-model="message" maxlength="70">
        </div>
        <div class="align-right">
          <button type="submit" class="btn btn-green"><font-awesome-icon icon="paper-plane" /></button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { bouyomiParameters, prepareSend, uri } from '@/utils'

export default Vue.extend({
  components: {
    StampList: () => import('@/components/user/form/stamp.vue')
  },
  data: () => ({
    message: '',
  }),
  computed: {
    fontSize () {
      return this.$store.getters['parameter/size']
    },
    fontColor () {
      return this.$store.getters['parameter/color']
    }
  },
  methods: {
    clear() {
      this.message = ''
    },
    useStamp(filename: string) {
      this.message += ` ${filename} `
    },
    async submit(): Promise<void> {
      await axios.post('/api/comment/message', {
        content: this.message,
        userId: this.$store.getters['user/userId'],
        color: this.fontColor,
        size: this.fontSize
      })
    },
    async bouyomiPlay(): Promise<void> {
      const bouyomiParams = await bouyomiParameters()
      
      if(bouyomiParams.isEnabled == 1) {
        const bouyomiUri = await uri()
        const socket = new WebSocket(bouyomiUri)
        const data = await prepareSend(bouyomiParams, this.message)

        socket.onopen = () => {
          socket.send(data)
        }
      }
    },
    async post() {
      if(this.message == ''){
        return
      }
      await this.submit()
      await this.bouyomiPlay()
      this.clear()
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include btn;
@include align;
@include row;

.message-form {
  margin: auto;
  width: 280px;
}

button {
  width: 80px;
}

form {
  input {
    width: 100%;
  }
}

</style>