<template>
  <header class="row mb-large">
    <nav>
      <router-link class="nav-item" to="/admin/index">
        <div><font-awesome-icon icon="home" class="icon" />home</div>
      </router-link>
      <span class="nav-item" @click="openWindow()">
        <div><font-awesome-icon icon="desktop" class="icon" />screen</div>
      </span>
      <router-link class="nav-item" to="/admin/setting">
        <div><font-awesome-icon icon="cogs" class="icon" />setting</div>
      </router-link>
      <router-link class="nav-item" to="/admin/history">
        <div><font-awesome-icon icon="comments" class="icon" />messages</div>
      </router-link>
      <router-link class="nav-item" to="/admin/users">
        <div><font-awesome-icon icon="user" class="icon" />users</div>
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    openWindow() {
      window.api.showWindow()
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include row;
@include margin;

// タブレット〜デスクトップ
@media screen and (min-width: 520px) {
  nav {
    text-align: center;

    span {
      cursor: pointer;
      color: var(--color-text-secondary);
      &:hover {
        color: var(--color-text-primary)
      }
    }
    .nav-item {
      display: inline-block;
      padding: .5rem 1.2rem;
      
      border-right: 1px solid rgba(9, 9, 9, 0.125);
      box-shadow: 1px -1px 0 rgba(255, 255, 255, .6) inset;

      background-color: #f0f0f0;
      background-image: linear-gradient(#fefefe 0%, #f0f0f0 50%, #e6e6e6);
      // background-image: -webkit-gradient(linear, left top, left bottom, from(#fefefe), color-stop(0.5, #f0f0f0), color-stop(0.51, #e6e6e6));
      // background-image: -moz-linear-gradient(#fefefe 0%, #f0f0f0 50%, #e6e6e6);

      &:first-child {
        border-radius: .5rem 0 0 .5rem;
      }
      &:last-child {
        border-radius: 0 .5rem .5rem 0;
        border-right: 0;
      }

      &:hover {
        background: radial-gradient(rgba(168, 168, 168, 0), rgba(168, 168, 168, .5));
      }

      .icon {
        margin-right: .4rem;
      }
    }
  }
}

// スマホサイズ
@media screen and (max-width: 519px) {
  header {
    width: 100vw;

    nav {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      border-top: 1px solid rgba(9, 9, 9, .125);

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .nav-item {
        width: 20%;
        display: inline-block;
        height: 3.5rem;
        padding: .5rem .8rem;
        box-sizing: border-box;

        background-color: #f0f0f0;
        background-image: linear-gradient(#fefefe 0%, #f0f0f0 50%, #e6e6e6);
        background-image: -webkit-gradient(linear, left top, left bottom, from(#fefefe), color-stop(0.5, #f0f0f0), color-stop(0.51, #e6e6e6));
        background-image: -moz-linear-gradient(#fefefe 0%, #f0f0f0 50%, #e6e6e6);


        &:last-child {
          border-right: 0;
        }
      }
    }
  }
}



</style>