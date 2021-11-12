<template>
  <van-cell-group title=" ">
    <van-swipe-cell>
      <van-cell title="chris's iPhone" icon="location-o" label="上次登陆于2021-09-14 17:51:28" value="内容"></van-cell>
      <template #right>
         <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>

    <van-swipe-cell>
      <van-cell title="暴走的兔子的Mi 10" icon="desktop-o" label="描述信息" value="内容"></van-cell>
      <template #right>
         <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </van-cell-group>
</template>
<script lang="ts" src="./LoginDeviceMgr.vue.ts"></script>
<style lang="css" scoped>
</style>