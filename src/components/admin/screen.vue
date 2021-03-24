<template>
  <section class="screen-wrapper">

    <comment-window v-if="viewer.isMsgWindowShow" class="window-card" :messages="messages" :emotes="emotes" />

    <return-btn class="return-btn" />

    <div class="stamps-info">
      <div class="info-wrapper">
        <div v-for="stamp in stamps" :key="stamp.id" class="item">
          <img :src="stamp.src" class="img" small />
          <span>{{ count[stamp.filename] }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import socketio from 'socket.io-client'
import { fontSize, fontColor, messageStyle, messageAnimation, stampStyle, stampAnimation } from '@/config'
import { rand, getImages, emoteFilenames, createNode } from '@/utils'

export default Vue.extend({
  components: {
    CommentWindow: () => import('@/components/admin/comment-window.vue'),
    ReturnBtn: () => import('@/components/admin/retrun-btn.vue')
  },
  data: () => ({
    socket: socketio.connect('localhost:3000'),
    count: {
      good: 0,
      bad: 0,
      poop: 0,
      think: 0
    },
    messages: [] as Message[],
    viewer: {} as ViewerParameter,
    stamps: [] as Image[],
    emotes: [] as Image[],
    emoteFilenames: {} as RegExp
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
    messageShow (message: Message): void {
      // create comment node
      const node = createNode(message.content, this.emotes)
      document.body.appendChild(node)

      // set comment style
      node.style.position = messageStyle.position
      node.style.top = rand(messageStyle.top) + 'px'
      node.style.whiteSpace = messageStyle.whiteSpace
      node.style.textShadow = messageStyle.textShadow
      node.style.fontSize = message.size ?? fontSize.normal
      node.style.color = message.color ?? fontColor.white

      this.animate(node, messageAnimation.keyframes, messageAnimation.options)
    },
    stampShow (filename: string): void {
      // create stamp node
      const node = document.createElement('img')
      node.src = require(`@/img/stamps/${filename}.png`)
      document.body.appendChild(node)

      // set stamp style
      node.style.position = stampStyle.position
      node.style.left = rand(stampStyle.left) + 'px'
      node.style.top = rand(stampStyle.top) - 100 + 'px'

      this.animate(node, stampAnimation.keyframes, stampAnimation.options)
    },
    animate (node: HTMLElement, keyframes: any, options: any): void {
      node.animate(keyframes, options)
        .onfinish = () => {
          document.body.removeChild(node)
        }
    }
  },
  created() {
    this.viewer.isNiconico = this.$store.getters['viewer/isNiconico']
    this.viewer.isMsgWindowShow = this.$store.getters['viewer/isMsgWindowShow']
  },
  mounted() {
    this.socket.on('message', (data: any) => {
      if(this.viewer.isNiconico){
        this.messageShow(data.message)
      }
      if(this.viewer.isMsgWindowShow){
        this.messages.push(data.message)
        if(this.messages.length >= 15) {
          this.messages.shift()
        }
      }
    }),
    this.socket.on('stamp', (data: any) => {
      this.stampShow(data.stamp)
      if(data.stamp === 'good') {
        this.count.good++
      } else if (data.stamp === 'bad') {
        this.count.bad++
      } else if (data.stamp === 'poop') {
        this.count.poop++
      } else if (data.stamp === 'think') {
        this.count.think++
      }
    })
  },
  async beforeMount() {
    const res = await getImages()
    this.emotes = res.emotes
    this.stamps = res.stamps
    this.emoteFilenames = emoteFilenames(this.emotes)
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include img-size();

.screen-wrapper {
  height: 100%;
  position: relative;

  .stamps-info{
    display: flex;
    justify-content: center;

    .info-wrapper {
      display: flex;
      position: absolute;
      bottom: 0;
      // left: calc(50% - 168px);

      background-color: #f0f0f0;
      background-image: linear-gradient(#fefefe 0%, #e0e0e0 50%, #c6c6c6);
      background-image: -webkit-gradient(linear, left top, left bottom, from(#fefefe), color-stop(0.5, #f0f0f0), color-stop(0.51, #e6e6e6));
      background-image: -moz-linear-gradient(#fefefe 0%, #f0f0f0 50%, #e6e6e6);

      border-radius: .5rem .5rem 0 0;

      .item {
        display: flex;
        align-items: center;
      }
    }

  }

  .img {
    margin-right: 1rem;
    vertical-align: bottom;
  }

  .item {
    padding-right: 3rem;
    margin: auto 0;
    &:first-child {
      padding-left: 3rem;
    }
  }
  
  span {
    font-size: 1.5rem;
  }
}

.return-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

</style>