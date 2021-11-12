<template>
  <div class="container-message-manager" ref="inputBar">
    <div
      class="container-send-message icon-send-message"
      @click.prevent="onCall"
    >
      <van-icon class="iconfont" class-prefix="icon" name="voice" size="24" />
    </div>
    <div class="message-text-box">
      <div
        ref="userInput"
        class="message-input"
        placeholder="type the message here"
        tabIndex="0"
        contenteditable="true"
        @input="handleType"
        @keyup.enter.exact="sendMsg"
      ></div>
    </div>
    <div
      class="container-send-message icon-send-message"
      @click.prevent="sendMsg"
    >
      <van-icon class="iconfont" class-prefix="icon" name="send" size="24" />
    </div>

    <van-popover placement="top-end" v-model:show="showEmojiPanel">
      <van-tabs v-model:active="activeTab">
        <van-tab name="a">
          <template #title>
            <van-icon class="iconfont" class-prefix="icon" name="emoji1"
          /></template>
          <emoji-picker @emojiSelected="insert" :search="search"></emoji-picker>
        </van-tab>
        <van-tab name="b">
          <template #title>
            <van-icon class="iconfont" class-prefix="icon" name="like"
          /></template>
          <div style="width: 550px; height: 320px;"></div>
        </van-tab>
        <van-tab title="标签 3" name="c">
          <div style="width: 550px; height: 320px;"></div>
        </van-tab>
      </van-tabs>

      <template #reference>
        <div class="container-send-message icon-send-message">
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="emoji"
            size="24"
          />
        </div>
      </template>
    </van-popover>

    <div class="container-send-message icon-send-message" @click="pickImage">
      <input
        ref="inputImage"
        :accept="acceptImageTypes"
        type="file"
        style="display: none"
        @input="handleImageChange"
      />
      <van-icon class="iconfont" class-prefix="icon" name="image" size="24" />
    </div>
    <div
      class="container-send-message icon-send-message"
      @click.prevent="onOpenMorePanel"
    >
      <van-icon class="iconfont" class-prefix="icon" name="file" size="24" />
    </div>

    <!-- <van-popup
      v-model:show="showEmojiPanel"
      closeable
      position="bottom"
      :overlay="false"
      :style="{ height: '280px' }"
      @click-close-icon="onCloseMojiPanel"
    >
      <van-grid style="height: 80%"> </van-grid>
      <van-tabs v-model:active="activeTab">
        <van-tab>
          <template #title> <van-icon name="smile-o" size="30" /> </template>
        </van-tab>
        <van-tab>
          <template #title> <van-icon name="like-o" size="30" /> </template>
        </van-tab>
      </van-tabs>
    </van-popup> -->

    <van-popup
      v-model:show="showMorePanel"
      closeable
      position="bottom"
      :overlay="false"
      :style="{ height: '280px' }"
      @click-close-icon="onCloseMorePanel"
    >
      <van-grid style="height: 80%"> </van-grid>
    </van-popup>

    <van-overlay :show="voiceCallShow" @click="voiceCallShow = false">
      <div class="wrapper" @click.stop>
        <div class="block" />
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts" src="./MessageBar.vue.ts"></script>

<style scoped>
.quick-chat-container .container-message-manager {
  height: 55px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border: #565867;
  border-width: 1px;
  -webkit-box-shadow: 0px -2px 40px 0px rgba(106, 106, 106, 0.67);
  box-shadow: 0px -2px 40px 0px rgba(106, 106, 106, 0.57);
}
.quick-chat-container .container-message-manager .message-text-box {
  padding: 0 10px 0 10px;
  flex: 1;
  overflow: hidden;
}

.quick-chat-container .container-message-manager .message-input {
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.33;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #565867;
  -webkit-font-smoothing: antialiased;
  max-height: 40px;
  bottom: 0;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  cursor: text;
  display: inline-block;
}

.quick-chat-container .container-message-manager .message-input:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  filter: contrast(15%);
  outline: none;
}

.quick-chat-container .container-message-manager .message-input:focus {
  outline: none;
}

.quick-chat-container .container-message-manager .container-send-message svg {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}

.quick-chat-container .container-message-manager .icon-send-message {
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s;
  border-radius: 11px;
  padding: 8px;
}

.quick-chat-container .container-message-manager .icon-send-message:hover {
  opacity: 1;
  background: #eee;
}
</style>
