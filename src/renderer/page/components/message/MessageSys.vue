<template>
  <a class="sys-message-container" href="/">
    <van-image
      align="center"
      width="400"
      height="260"
      radius="8px"
      src="https://www.artdesign.org.cn/Upload/article/20210823/53752-d7e963290d9ada7393c92f5de9092e90.jpeg"
    />
    <span style="margin-top: 5px;">{{ message.content }}</span>
    <div class="message-timestamp" :style="{ 'justify-content': 'baseline' }">
      {{ message.timestamp.toRelative() }}
    </div>
  </a>
</template>
<script lange="ts" src="./MessageSys.vue.ts"></script>
<style lang="css" scoped>

.sys-message-container {

  border-radius: 8px;;
  margin-bottom: 30px;
  width: 400px;
  text-align: center;
  background: white;
  padding-bottom: 5px;
}

.message-timestamp {
  padding: 5px 7px;
  border-radius: 15px;
  margin: 0;
  overflow-wrap: break-word;
  text-align: center;
  font-size: 10px;
  color: #bdb8b8;
  align-items: center;
}
</style>