<template>
  <div
    ref="containerMessageDisplay"
    class="container-message-display"
    @scroll="updateScrollState"
  >
    <div v-if="loading" class="loader" align="center">
      <div class="message-loading"></div>
    </div>
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="message-container"
      :style="{ 'align-content': message.type == 6 ? 'center' : '' }"
    >
      <message-sys
        v-if="message.type == 6"
        :message="message"
        :timestamp-config="timestampConfig"
        @onImageClicked="onImageClicked"
        align="center"
      />
      <message-to
        v-else-if="message.uid == myself.uid"
        :message="message"
        :async-mode="asyncMode"
        :timestamp-config="timestampConfig"
        @onImageClicked="onImageClicked"
      />
      <message-from
        v-else
        :message="message"
        :async-mode="asyncMode"
        :timestamp-config="timestampConfig"
        @onImageClicked="onImageClicked"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./MessageDisplay.vue.ts"></script>

<style>
.container-message-display {
  flex: 1;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  height: calc(100vh - 298px);
}

.message-image-display {
  max-width: 400px;
  max-height: 500px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}

.message-image-display:hover {
  opacity: 0.8;
}

.message-text > p {
  margin: 5px 0 5px 0;
  font-size: 14px;
}

.quick-chat-container
  .container-message-display
  .my-message
  > .message-timestamp {
  text-align: right;
}

.other-message {
  justify-content: flex-start;
  padding-left: 15px;
  align-items: flex-start;
}

.other-message > .message-text {
  color: #fff;
  border-bottom-left-radius: 0;
}

.my-message > .message-text {
  border-bottom-right-radius: 0;
}

.message-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.message-username {
  font-size: 10px;
  font-weight: bold;
}

.icon-sent {
  padding-left: 5px;
  color: rgb(129, 127, 127);
}

.message-loading {
  height: 8px;
  width: 8px;
  border: 1px solid rgb(187, 183, 183);
  border-left-color: rgb(59, 59, 59);
  border-radius: 50%;
  margin-left: 5px;
  display: inline-block;
  animation: spin 1.3s ease infinite;
}

.loader .message-loading {
  width: 16px;
  height: 16px;
  margin: 5px 0 0 0;
}

.img-loading {
  height: 20px;
  width: 20px;
  border: 3px solid #ffffff00;
  border-left-color: #847f7f;
  border-top-color: #847f7f;
  border-radius: 50%;
  margin-left: 5px;
  display: inline-block;
  -webkit-animation: spin 1s ease infinite;
  animation: spin 1s ease infinite;
  position: absolute;
}

.img-overlay {
  opacity: 0.4;
}

.message-username-image {
  margin: 10px 10px 0px 10px;
  font-size: 12px;
  font-weight: bold;
}

.link-class {
  text-decoration: underline;
  color: grey;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
