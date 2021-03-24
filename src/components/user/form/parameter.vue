<template>
  <section class="parameter-content">
    <div class="row">
      <span class="info">font size: </span>
      <select name="font-size" v-model="selectedSize">
        <option v-for="(size, key) in fontSize" :value="size" :class="key" :key="size.id">{{ key }}</option>
      </select>
    </div>

    <div class="row">
      <span class="info">font color: </span>
      <button
        type="button"
        name="font-color"
        :class="['btn', 'btn-'+colorName, 'selected-color']"
        @click="toggleCard()"
      ></button>
      <colors-card v-if="isShow" @selected="selectedColor($event)" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { fontSize } from '@/config'

export default Vue.extend({
  components: {
    ColorsCard: () => import('@/components/user/form/colors-card.vue')
  },
  data: () => ({
    isShow: false,
    colorName: 'white',
    fontSize: fontSize,
  }),
  computed: {
    selectedSize: {
      get () {
        return this.$store.getters['parameter/size']
      },
      set (size) {
        this.$store.dispatch('parameter/setSize', size)
      }
    },
  },
  methods: {
    toggleCard() {
      this.isShow = !this.isShow
    },
    selectedColor(colorName: string) {
      this.colorName = colorName
      this.isShow = false
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include btn();
@include row();

.parameter-content {
  width: 280px;
  margin: auto;
}

select {
  width: 6rem;
}

.selected-color {
  vertical-align: top;
  border: 1px solid #888;
}

</style>