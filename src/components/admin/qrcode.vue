<template>
  <article>
    <div class="row card mb-large" :class="{ error: failed }">
      <div class="title">set URL</div>
      <div>
        http:// <input type="text" v-model="ipaddr" maxlength="15" placeholder="IP Address"> :3000
      </div>
      <div>
        <button type="btn" class="btn btn-green" @click="renewUrl">update</button>
      </div>
    </div>

    <div class="row align-center mb-large">
      <a :href="url">{{ url }}</a>
    </div>
    
    <div class="row">
      <img :src="qrcode" />
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import QRCode from 'qrcode'

export default Vue.extend({
  data: () => ({
    ipaddr: '',
    qrcode: '',
    url: '',
    failed: false,
  }),
  methods: {
    isIpAddress(address: string) {
      return /\d{2,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(address)
    },
    renewUrl() {
      const isIp = this.isIpAddress(this.ipaddr)
      if(!isIp) {
        this.failed = true
        window.setTimeout((): void => {
          this.failed = false
        }, 2000)
        return
      }
      
      const renewUrl = `http://${this.ipaddr}:3000`
      this.generateQR(renewUrl)
      this.url = renewUrl
    },
    async generateQR(url: string): Promise<void> {
      try {
        this.qrcode = await QRCode.toDataURL(url)
      } catch (err) {
        console.error(err)
      }
    },
    async endPoint(): Promise<string> {
      const res = await axios.get('/api/admin/addr')
      const endPointInfo = res.data.endPointInfo
      return `http://${endPointInfo.privateAddr}:${endPointInfo.port}`
    },
  },
  async mounted() {
    this.url = await this.endPoint()
    this.generateQR(this.url)
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include btn;
@include align;
@include row;
@include card;
@include margin;
@include shake-keyframs;

.card {
  display: flex;
  justify-content: space-between;
  transition: .5s;
}

.error {
  border-color: var(--color-red);
  animation: shake .5s;
}

img {
  width: 100%;
}
</style>