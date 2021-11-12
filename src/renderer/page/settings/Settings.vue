<template>
  <van-row class="full-row setting-container" gutter="24">
    <van-col
      span="4"
      style="padding: 0; width: 100%; height: 100%; overflow-y: auto"
    >
      <van-sidebar v-model="activeKey" style="width: 100%">
        <van-sidebar-item
          title="账号与安全"
          to="/settings/accountAndSecurity"
          replace
        />
        <van-sidebar-item
          title="聊天与通知"
          to="/settings/messageAndNotify"
          replace
        />
        <van-sidebar-item title="通用" to="/settings/common" replace />
        <van-sidebar-item title="关于 mini fun" to="/settings/about" replace />
        <van-sidebar-item
          title="帮助与反馈"
          to="/settings/helpAndFeedback"
          replace
        />
      </van-sidebar>
    </van-col>
    <van-col span="20" class="setting-detail-container">
      <router-view v-slot="{ Component }">
        <transition name="slide-left">
          <component :is="Component" />
        </transition>
      </router-view>
    </van-col>
  </van-row>
</template>

<script lang="ts" src="./Settings.vue.ts"></script>

<style>
.setting-container {
  width: 100%;
  height: calc(100vh-122px);
  overflow: hidden;
}
.setting-detail-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
