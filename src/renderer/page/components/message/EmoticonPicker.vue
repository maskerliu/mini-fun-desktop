<template>
  <van-grid
    square
    clickable
    :border="false"
    column-num="3"
    style="width: 240px"
  >
    <van-grid-item
      v-for="i in 6"
      :key="i"
      text="选项"
      icon="photo-o"
      @click="showPopover = false"
    />
  </van-grid>
</template>

<script lang="ts" src="./CustomEmojiPicker.vue.ts"></script>
<style scoped>
</style>