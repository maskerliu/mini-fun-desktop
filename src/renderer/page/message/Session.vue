<template>
  <div class="quick-chat-container" v-if="curSid != null">
    <message-display
      :async-mode="true"
      :messages="messages"
      :load-more-messages="loadMoreMessages"
      :timestamp-config="timestampConfig"
      @onImageClicked="onImageClicked"
    />
    <message-bar
      accept-image-types="image/*"
      @onImageSelected="onImageSelected"
      @onMessageSubmit="onMessageSubmit"
      @onType="onType"
    />
    <van-popup
      v-model:show="show"
      position="right"
      :style="{ width: '35%', height: '100vh', background: '#eee' }"
    >
      <p align="center">聊天信息({{ session(curSid).members.length }})</p>
      <van-grid
        square
        style="margin-top: 20px"
        v-if="session(curSid).type != 2"
      >
        <van-grid-item
          v-for="uid in session(curSid).members"
          :key="uid"
          icon="photo-o"
        >
          <van-image round :src="user(uid).avatar" width="50" height="50" />
          <span style="margin-top: 10px; font-size: 12px">{{
            user(uid).nickname
          }}</span>
        </van-grid-item>
        <van-grid-item>
          <van-button icon="plus" type="primary" plain></van-button>
        </van-grid-item>
      </van-grid>

      <van-cell-group title=" " v-if="session(curSid).type == 1">
        <van-cell
          title="群聊名称"
          value="技术对接群"
          clickable
          is-link
        ></van-cell>
        <van-cell title="群二维码" clickable is-link center>
          <template #right-icon>
            <van-icon name="qr" size="20px" />
          </template>
        </van-cell>
        <van-cell title="群公告" clickable is-link></van-cell>
        <van-cell title="备注" clickable is-link></van-cell>
      </van-cell-group>
      <van-cell-group title=" ">
        <van-cell title="消息免打扰">
          <van-switch v-model="mute" size="20px" />
        </van-cell>
        <van-cell title="置顶聊天">
          <van-switch v-model="mute" size="20px" />
        </van-cell>
        <van-cell title="保存到通讯录" v-if="session(curSid).type == 1">
          <van-switch v-model="mute" size="20px" />
        </van-cell>
      </van-cell-group>

      <van-cell-group title=" " v-if="session(curSid).type == 1">
        <van-cell title="我在群里的昵称" is-link value="甲壳虫"> </van-cell>
        <van-cell title="显示群成员昵称">
          <van-switch v-model="mute" size="20px" />
        </van-cell>
      </van-cell-group>

      <van-cell-group title=" ">
        <van-cell title="清空聊天记录" clickable @click="onClearGroupMessage">
        </van-cell>
        <van-cell
          title="退出群聊"
          clickable
          @click="onLeaveGroup"
          v-if="session(curSid).type == 1"
        >
        </van-cell>
      </van-cell-group>
    </van-popup>
  </div>
</template>
<script src="./Session.vue.ts" lang="ts"></script>
<style scoped>
.quick-chat-container {
  display: flex;
  width: 100%;
  height: calc(100vh - 122px);
  background: #f0eeee;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  border: 10px;
}
</style>