<template>
  <div id="app" class="relative h-full">
    <button
      class="absolute text-3xl border-2 border-gray-600 rounded-xl bg-gray-700 text-gray-100"
      @dblclick="isOpenMenu = !isOpenMenu"
      v-if="!isOpenMenu"
      v-drag
    >
      三
    </button>
    <transition name="menu">
      <div
        class="menu absolute flex border-2 border-gray-400 w-11/12 items-center justify-center rounded-full"
        v-if="isOpenMenu"
        v-drag
      >
        <div class="flex">
          <button class="menu_btn move">動</button>
          <button class="menu_btn" @click="goBack">前</button>
          <button class="menu_btn" @click="goForward">次</button>
          <button class="menu_btn" @click="reload">再</button>
        </div>
        <input
          class="rounded-lg border text-gray-800 border-gray-200 bg-white w-4/6"
          v-model="serchQuery"
          @keydown.enter="loadurl"
          placeholder="URL or google検索"
        />
        <div class="flex">
          <button class="menu_btn" @click="isOpenMenu = !isOpenMenu">消</button>
          <button class="menu_btn" @click="setTop">上</button>
        </div>
      </div>
    </transition>
    <webview class="h-full" ref="wv" src="https://google.com"> </webview>
  </div>
</template>

<script>
import drag from "@branu-jp/v-drag";
import { remote } from "electron";
export default {
  name: "App",
  directives: {
    drag,
  },
  data() {
    return {
      isOpenMenu: false,
      serchQuery: "",
      webview: null,
      win: null,
      isTop: false,
    };
  },
  methods: {
    loadurl() {
      const isUrl = (function (url) {
        try {
          new URL(url);
        } catch (_) {
          return false;
        }
        return true;
      })(this.serchQuery);
      if (isUrl) {
        this.webview.loadURL(this.serchQuery);
        return;
      }
      const serchURL = this.serchQuery.replace(/\s/g, "+");
      this.webview.loadURL(`https://www.google.com/search?q=${serchURL}`);
    },
    goBack() {
      this.webview.canGoBack() && this.webview.goBack();
    },
    goForward() {
      this.webview.canGoForward() && this.webview.goForward();
    },
    reload() {
      this.webview.reload();
    },
    setURL() {
      this.serchQuery = this.webview.geturl();
    },
    setTop() {
      this.isTop = !this.isTop;
      this.win.setAlwaysOnTop(this.isTop);
    },
  },
  mounted: function () {
    this.webview = this.$refs.wv;
    this.win = remote.BrowserWindow.getFocusedWindow();
  },
};
</script>

<style scoped>
.menu_btn {
  @apply text-2xl rounded-full m-1 hover:bg-gray-200;
}
.menu {
  backdrop-filter: blur(3px);
}
.move {
  -webkit-app-region: drag;
}
</style>
