<template>
  <div>
    <span
      class="icon"
      v-if="isHover"
      @mouseleave="mouseLeave()"
      @click="closeWindow()"
    >
      <font-awesome-icon icon="times-circle" />
    </span>

    <span
      v-else
      class="icon"
      @mouseenter="mouseEnter()"
    >
      <font-awesome-icon icon="circle" />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({ 
    isHover: false
  }),
  methods: {
    mouseLeave() {
      this.isHover = false
      window.api.disable()
    },
    mouseEnter() {
      this.isHover = true
      window.api.enable()
    },
    closeWindow() {
      window.api.closeWindow()
    }
  }
})
</script>

<style lang="scss" scoped>

.icon {
  font-size: 3rem;
  opacity: .1;
  transition: .2s;
  color: var(--color-red);

  &:hover {
    opacity: 1;
  }
}
</style>