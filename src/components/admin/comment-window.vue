<template>
  <div @mouseenter="mouseEnter()" @mouseleave="mouseLeave()" id="test">
    <vue-draggable-resizable
      :w="200"
      :maxWidth="300"
      :h="100"
      :maxHeight="250"
      @dragging="onDrag"
      @resizing="onResize"
      :active="isActive === true"
      class="message-window"
    >
      <div class="history-card" id="message-box"></div>
    </vue-draggable-resizable>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import { createNode } from '@/utils'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

export default Vue.extend({
  data: () => ({
    isActive: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }),
  props: {
    messages: {
      type: Array,
    } as PropOptions<Message[]>,
    emotes: {
      type: Array
    } as PropOptions<Image[]>
  },
  methods: {
    mouseEnter() {
      this.isActive = true
      window.api.enable()
    },
    mouseLeave() {
      this.isActive = false
      window.api.disable()
      
    },
    onResize(x: number, y: number, width: number, height: number) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag(x: number, y: number) {
      this.x = x
      this.y = y
    },
  },
  watch: {
    messages(messages: Message[]) {
      const div = document.getElementById('message-box')
      div!.innerHTML = ''
      messages.map((message: Message) => {
        const node = createNode(message.content, this.emotes)
        div!.appendChild(node)
      })
      div!.scrollIntoView(false)
    }
  },
  mounted() {
    // modify vue-draggable-resizable css
    const handles = document.getElementsByClassName('handle')
    Object.values(handles).map((handle: any) => {
      const classNames = handle.className.split(' ')
      if(classNames.indexOf('handle-tl') === 1){
        handle.style.top = '0'
        handle.style.left = '0'
      } else if(classNames.indexOf('handle-tm') === 1) {
        handle.style.top = '0'
      } else if(classNames.indexOf('handle-tr') === 1) {
        handle.style.top = '0'
        handle.style.right = '0'
      } else if(classNames.indexOf('handle-mr') === 1) {
        handle.style.right = '0'
      } else if(classNames.indexOf('handle-br') === 1) {
        handle.style.bottom = '0'
        handle.style.right = '0'
      } else if(classNames.indexOf('handle-bm') === 1) {
        handle.style.bottom = '0'
      } else if(classNames.indexOf('handle-bl') === 1) {
        handle.style.bottom = '0'
        handle.style.left = '0'
      } else if(classNames.indexOf('handle-ml') === 1) {
        handle.style.left = '0'
      }
    })
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

.vdr {
  border: none;
}

.message-window {
  margin: 2rem;
  line-height: 1.8rem;
  overflow: hidden;
  overflow-y: scroll;
  background-color: var(--color-bg-primary);

  &::-webkit-scrollbar {
    display: none;
  }
}

.history-card {
  color: var(--color-text-primary);
  font-size: 15px;
  padding: .4rem 0 .4rem 1rem;
}

</style>