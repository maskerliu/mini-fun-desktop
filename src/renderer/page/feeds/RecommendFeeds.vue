<template>
  <van-row class="full-row">
    <van-tabs style="height: 44px;">  
      <van-tab v-for="index in 19" :title="'标签 ' + index" :key="index"></van-tab>
    </van-tabs>
    <van-list
      style="width: 100%; margin-top: -140px;"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" clickable />
    </van-list>
  </van-row>
</template>

<script lang="ts" src="./RecommendFeeds.vue.ts"></script>

<style>

</style>
