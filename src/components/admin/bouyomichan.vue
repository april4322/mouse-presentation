<template>
  <form>
    <div class="row mb-normal">
      <toggle-button
        @change="showToggle()"
        :value="params.isEnabled"
        :labels="true"
        :height="18"
        :width="45"
        class="toggle-btn mr-small"
      />棒読みちゃん [有効/無効]
    </div>
    
    <table>
      <thead>
        <tr>
          <th class="column-20"></th>
          <th class="column-25"></th>
          <th class="column-40"></th>
          <th class="column-15"></th>
        </tr>
      </thead>
      <tbody v-if="params.isEnabled">
        <tr>
          <td>スピード</td>
          <td>
            <toggle-button
              @change="prioritizeMain('speed', $event.value)"
              :value="isMainSpeedEnabled"
              :labels="true"
              :height="18"
              :width="45"
              class="toggle-btn mr-small"
            />本体設定
          </td>
          <td class="input-range">
            <input
              type="range"
              @mouseup="update(params)"
              v-model.number="params.speed"
              min="50"
              max="200"
              :disabled="isMainSpeedEnabled"
            ></td>
          <td>{{ params.speed }}</td>
        </tr>

        <tr>
          <td>ピッチ</td>
          <td>
            <toggle-button
              @change="prioritizeMain('pitch', $event.value)"
              :value="isMainPitchEnabled"
              :labels="true"
              :height="18"
              :width="45"
              class="toggle-btn mr-small"
            />本体設定
          </td>
          <td class="input-range">
            <input
              type="range"
              @mouseup="update(params)"
              v-model.number="params.pitch"
              min="50"
              max="200"
              :disabled="isMainPitchEnabled"
            ></td>
          <td>{{ params.pitch }}</td>
        </tr>

        <tr>
          <td>ボリューム</td>
          <td>
            <toggle-button
              @change="prioritizeMain('volume', $event.value)"
              :value="isMainVolumeEnabled"
              :labels="true"
              :height="18"
              :width="45"
              class="toggle-btn mr-small"
            />本体設定
          </td>
          <td class="input-range">
            <input
              type="range"
              @mouseup="update(params)"
              v-model.number="params.volume"
              min="0"
              max="100"
              :disabled="isMainVolumeEnabled"
            ></td>
          <td>{{ params.volume }}</td>
        </tr>

        <tr>
          <td>声のタイプ</td>
          <td>
            <toggle-button
              @change="prioritizeMain('type', $event.value)"
              :value="isMainTypeEnabled"
              :labels="true"
              :height="18"
              :width="45"
              class="mr-small"
            />本体設定
          </td>
          <td colspan="2">
            <select v-model.number="params.type" :disabled="isMainTypeEnabled">
              <option v-for="option in options" :value="option.value" :key="option.id">
                {{ option.name }}
              </option>
            </select>
          </td>
        </tr>

        <tr>
          <td colspan="4" class="align-center">
            <button type="btn" class="btn btn-blue" @click="setDefault">default</button>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import ToggleButton from 'vue-js-toggle-button'
import { defaultSetting, types } from '@/config'

Vue.use(ToggleButton)

export default Vue.extend({
  data: () => ({
    params: {} as BouyomiChanParameter,
    msg: '',
    options: types,
  }),
  computed: {
    isMainSpeedEnabled() {
      return this.params.speed === -1
    },
    isMainPitchEnabled() {
      return this.params.pitch === -1
    },
    isMainVolumeEnabled() {
      return this.params.volume === -1
    },
    isMainTypeEnabled() {
      return this.params.type === 0
    }
  },
  methods: {
    prioritizeMain(type: string, disabled: boolean) {
      if(type === 'speed') {
        if(disabled) {
          this.params.speed = -1
        } else {
          this.params.speed = 100
        }
      }
      else if(type === 'pitch') {
        if(disabled) {
          this.params.pitch = -1
        } else {
          this.params.pitch = 100
        }
      }
      else if(type === 'volume') {
        if(disabled) {
          this.params.volume = -1
        } else {
          this.params.volume = 100
        }
      }
      else if(type === 'type') {
        if(disabled) {
          this.params.type = 0
        } else {
          this.params.type = 1
        }
      }
      this.update(this.params)
    },
    setDefault() {
      this.update(defaultSetting)
    },
    showToggle() {
      this.params.isEnabled = !this.params.isEnabled
      this.update(this.params)
    },
    update(params: BouyomiChanParameter) {
      this.$store.dispatch('bouyomichan/setAll', params)
    }
  },
  created() {
    this.params = this.$store.getters['bouyomichan/all']
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include margin();
@include align();
@include btn();
@include column-size();

form {
  text-align: center;
}

input {
  &[type="checkbox"] {
    display: none;
  }
}

select {
  width: 100%;
}

.input-range {
  text-align: center;

  input {
    -webkit-appearance: none;
    width: 100%;
    height: .6rem;
    border-radius: 1rem;
    background-color: #8acdff;
    border: 2px solid #dff1ff;
    padding: 0;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    background-color: var(--color-blue);
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  }
  &::-moz-range-thumb {
    background-color: var(--color-blue);
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
    border: none;
  }
}

table {
  margin: 0 auto;
  
  thead {
    font-size: 0;
  }
  
  td {
    padding: 1.5rem;
  }

  @media only screen and (max-width: 667px) {
    td {
      padding: .8rem;
    }
  }
}

</style>