<template>
    <div class="card">
      <div class="title">Comment Display Setting</div>
      <div class="row">
        <toggle-button 
          @change="toggleShow()"
          :value="param.isMsgWindowShow"
          :labels="true"
          :height="18"
          :width="45"
          class="toggle-btn mr-small"
        />
        <span class="mr-large">Comment History [Show/Hide]</span>
      </div>
      <div>
        <toggle-button
          @change="toggleNiconico()"
          :value="param.isNiconico"
          :labels="true"
          :height="18"
          :width="45"
          class="toggle-btn mr-small"
        />
        <span>Show comment in NicoNico Format</span>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton)

export default Vue.extend({
  data: () => ({
    param: {} as ViewerParameter
  }),
  methods: {
    toggleNiconico() {
      this.param.isNiconico = !this.param.isNiconico
      this.setNiconico()
    },
    toggleShow() {
      this.param.isMsgWindowShow = !this.param.isMsgWindowShow
      this.setView()
    },
    setNiconico() {
      this.$store.dispatch('viewer/setIsNiconico', this.param.isNiconico)
    },
    setView() {
      this.$store.dispatch('viewer/setIsMsgWindowShow', this.param.isMsgWindowShow)
    }
  },
  created() {
    this.param = this.$store.getters['viewer/all']
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include margin();
@include btn();
@include row();
@include card();

.card {
  margin: 0 auto;
}

</style>