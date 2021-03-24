<template>
  <div>
    <ul class="param-card row">
      <li v-for="emote in emotes" :key="emote.id">
        <img :src="emote.src" class="img" small @click="use(emote.filename)" />
      </li>
    </ul>

    <div class="card row">
      <div class="title">stamps</div>
      <ul>
        <li v-for="stamp in stamps" :key="stamp.id">
          <img :src="stamp.src" class="img" normal @click="submit(stamp.filename)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { getImages } from '@/utils'

export default Vue.extend({
  data: () => ({
    stamps: [],
    emotes: []
  }),
  methods: {
    use(filename: string): void {
      this.$emit('useStamp', filename)
    },
    async submit(filename: string): Promise<void> {
      await axios.post('/api/comment/stamp', { filename: filename })
    },
  },
  async mounted() {
    const res = await getImages()
    this.stamps = res.stamps
    this.emotes = res.emotes
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include img-size();
@include row();
@include param-card();
@include card();

.card{
  ul {
    display: flex;
    justify-content: center;

    img {
      margin-right: 1rem;
      width: 3rem!important;
    }
  }
}

</style>

