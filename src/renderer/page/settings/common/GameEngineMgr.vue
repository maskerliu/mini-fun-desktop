<template>
  <div class="full-row">
    <van-cell-group title=" " style="full-row">
      <van-cell
        v-for="(item, idx) in engines"
        :key="idx"
        :label="item.url"
        center
      >
        <template #title>
          <span class="custom-title">{{ item.name }}</span>
          <van-tag type="success" plain style="margin-left: 10px;">{{ item.version }}</van-tag>
        </template>
        <template #right-icon>
          <van-button plain hairline loading type="info" size="small">
            更新
          </van-button>
          <van-button
            plain
            hairline
            type="danger"
            size="small"
            style="margin-left: 15px"
          >
            删除
          </van-button>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script src="./GameEngineMgr.vue.ts" lang="ts"></script>
<style lang="less">
</style>