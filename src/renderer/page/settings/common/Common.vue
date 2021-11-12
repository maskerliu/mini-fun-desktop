<template>
  <div class="full-row">
    <van-cell-group inset title=" " style="full-row">
      <van-cell title="多语言" value="跟随系统" is-link to="/settings/common/selectLang" />
      <van-cell title="字体大小" is-link />
      <van-cell title="游戏引擎管理" is-link to="/settings/common/gameEngineMgr"/>
      <van-cell title="辅助功能" is-link />
      <van-cell title="流量统计" is-link />
      <van-cell title="存储空间" is-link />
    </van-cell-group>
  </div>
</template>

<script src="./Common.vue.ts" lang="ts"></script>

<style>
</style>