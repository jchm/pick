<template>
  <div id="app"><router-view /></div>
</template>

<style>
@import "../node_modules/normalize.css/normalize.css";

html {
  background-color: #fff;
}

html,
body {
  height: 100%;
  margin: 0;
}

body {
  position: relative;

  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
}

#app {
  padding: 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
