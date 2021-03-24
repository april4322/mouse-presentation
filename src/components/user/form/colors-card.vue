<template>
  <div>
    <ul class="param-card">
      <li v-for="(color, colorName) in fontColor" :key="color.id">
        <button
          type="button"
          name="font-color"
          :value="color"
          :class="['btn', 'btn-'+colorName]"
          @click="setColor(color, colorName)"
        ></button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { fontColor } from '@/config'

export default Vue.extend({
  data: () => ({
    fontColor: fontColor
  }),
  methods: {
    setColor(rgb: string, colorName: string): void {
      this.$store.dispatch('parameter/setColor', rgb)
      this.$emit('selected', colorName)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include btn();
@include param-card();

button {
  width: 2rem;
  height: 2rem;
}

.btn-white {
  border: 1px solid #888;
}

</style>