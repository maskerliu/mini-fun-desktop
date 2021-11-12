<template>
  <div class="emoji-panel">
    <div
      class="emoji-category"
      v-for="(emojiGroup, category) in emojis"
      :key="category"
    >
      <h5>{{ category }}</h5>
      <div>
        <span
          class="emoji-item"
          v-for="(emoji, emojiName) in emojiGroup"
          :key="emojiName"
          @click="$emit('emojiSelected', emoji)"
          :title="emojiName"
          >{{ emoji }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./EmojiPicker.vue.ts"></script>
<style scoped>
.emoji-panel {
  overflow-x: hidden;
  overflow-y: auto;
  width: 550px;
  height: 320px;
  padding:15px 0;
}

.emoji-category {
  padding-left: 15px;
}

.emoji-item {
  font-size: 2rem;
  margin: 15px 15px 0 0;
  cursor: pointer;
}
</style>