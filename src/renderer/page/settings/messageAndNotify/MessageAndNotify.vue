<template>
  <div class="full-row" style="overflow: auto;">
    <van-cell-group inset title=" ">
      <van-cell title="回车键发送消息">
        <template #right-icon>
          <van-switch v-model="enterSendMsgChecked" size="20px" />
        </template>
      </van-cell>
      <van-cell title="聊天背景" is-link />
      <van-cell title="表情管理" is-link />
    </van-cell-group>

    <van-cell-group inset title=" ">
      <van-cell title="聊天记录备份与迁移" is-link />
      <van-cell title="清空聊天记录" is-link @click="clearHistoryMsgConfirm" />
    </van-cell-group>

    <van-cell-group inset title="通知与声音">
      <van-cell title="接收新消息通知">
        <template #right-icon>
          <van-switch v-model="acceptNewMsgNotifyChecked" size="20px" />
        </template>
      </van-cell>
      <van-cell title="接收语音和视频通话邀请提醒">
        <template #right-icon>
          <van-switch v-model="acceptVoiceAndVideoChecked" size="20px" />
        </template>
      </van-cell>
      <van-cell title="消息提示音" value="跟随系统" is-link />
      <van-cell title="来电铃声" is-link />
    </van-cell-group>

    <van-cell-group inset title="更新提醒" style="margin-bottom: 20px">
      <van-cell title="朋友圈">
        <template #right-icon>
          <van-switch v-model="acceptVoiceAndVideoChecked" size="20px" />
        </template>
      </van-cell>
      <van-cell title="附近">
        <template #right-icon>
          <van-switch v-model="acceptVoiceAndVideoChecked" size="20px" />
        </template>
      </van-cell>
      <van-cell title="游戏">
        <template #right-icon>
          <van-switch v-model="acceptVoiceAndVideoChecked" size="20px" />
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group inset title="更新提醒" style="margin-bottom: 20px">
      <van-cell title="朋友圈">
        <template #right-icon>
          <van-switch v-model="acceptVoiceAndVideoChecked" size="20px" />
        </template>
      </van-cell>
      <van-cell title="附近">
        <template #right-icon>
          <van-switch v-model="acceptVoiceAndVideoChecked" size="20px" />
        </template>
      </van-cell>
      <van-cell title="游戏">
        <template #right-icon>
          <van-switch v-model="acceptVoiceAndVideoChecked" size="20px" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script src="./MessageAndNotify.vue.ts" lang="ts"></script>

<style>
.fun-row {
  overflow: auto;
}
</style>