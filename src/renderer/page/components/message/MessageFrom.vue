<template>
  <div class="other-message-body">
    <div class="thum-container">
      <img class="user-thumb" :src="user(message.uid).avatar" />
    </div>
    <div class="message-content">
      <template v-if="message.type == 1">
        <!-- 文字 -->
        <div class="message-text">
          <p ref="message-content">{{ message.content }}</p>
        </div>
      </template>
      <template v-else-if="message.type == 2">
        <!-- 表情 -->
        <div class="message-text">
          <p ref="message-content">{{ message.content }}</p>
        </div>
      </template>
      <template v-if="message.type == 3">
        <div v-if="message.sent" class="messae-image">
          <img
            class="message-image-display"
            alt=""
            :src="message.content"
            @click="onImageClicked(message)"
          />
        </div>
        <div v-else class="message-image">
          <img
            class="message-image-display img-overlay"
            alt=""
            :src="message.content"
          />
          <div class="img-loading"></div>
        </div>
      </template>
      <template v-else-if="message.type == 4">
        <!-- 语音 -->
        <div class="message-text">
          <p ref="message-content" style="padding-right: 80px;">
            <van-icon class="iconfont" class-prefix="icon" name="audio" color="grey" size="20"/>
          </p>
        </div>
      </template>
      <template v-else-if="message.type == 5">
        <!-- 视频 -->
        <div class="message-text">
          <p ref="message-content">{{ message.content }}</p>
        </div>
      </template>
      <div class="message-timestamp" :style="{ 'justify-content': 'baseline' }">
        <template v-if="timestampConfig.relative">
          {{ message.timestamp.toRelative() }}
        </template>
        <template v-else>
          {{ message.timestamp.toFormat(timestampConfig.format) }}
        </template>
        <van-icon
          v-if="asyncMode && message.uploaded && !message.viewed"
          :size="14"
          name="success"
        />
        <van-icon
          v-else-if="asyncMode && message.uploaded && message.viewed"
          :size="14"
          name="certificate"
        />
        <van-icon
          v-if="asyncMode && message.sent && !message.read"
          :size="8"
          class="iconfont"
          class-prefix="icon"
          name="check"
        />
        <van-icon
          v-else-if="asyncMode && message.sent && message.read"
          :size="8"
          class="iconfont"
          class-prefix="icon"
          name="double-check"
        />
        <div v-else-if="asyncMode" class="message-loading"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./MessageFrom.vue.ts"></script>

<style lang="css" scoped>
.other-message-body {
  display: flex;
  align-items: flex-end;
  padding: 5px 10px 0 10px;
}

.message-content {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  flex-grow: 1;
}

.message-image {
  padding: 6px 10px;
  border-radius: 15px;
  margin: 5px 0 5px 0;
  max-width: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-thumb {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-timestamp {
  padding: 2px 7px;
  border-radius: 15px;
  margin: 0;
  max-width: 50%;
  overflow-wrap: break-word;
  text-align: left;
  font-size: 10px;
  color: #bdb8b8;
  width: 100%;
  display: flex;
  align-items: center;
}

.message-text {
  background: #fff;
  padding: 6px 10px;
  line-height: 20px;
  border-radius: 15px;
  margin: 5px 0 5px 0;
  max-width: 70%;
  overflow-wrap: break-word;
  text-align: left;
  white-space: pre-wrap;
  border-bottom-left-radius: 0px;
  word-break: break-word;
}
</style>