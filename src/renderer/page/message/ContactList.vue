<template>
  <van-row class="full-row">
    <van-index-bar style="width: 100%" v-if="friends != null && users.size > 0">
      <van-index-anchor index="A" />
      <van-cell v-for="uid in friends" :key="uid" size="large" clickable center>
        <template #title>
          <van-row>
            <van-image
              width="45px"
              height="45px"
              radius="7px"
              :src="users.get(uid).avatar"
            />
            <div style="padding-left: 15px">
              <span style="font-size: 18px">{{ users.get(uid).nickname }}</span
              ><br />
              <span style="font-size: 14px; color: grey">{{}}</span>
            </div>
          </van-row>
        </template>
      </van-cell>
    </van-index-bar>
  </van-row>
</template>
<script src="./ContactList.vue.ts" lang="ts"></script>
<style  scoped>
</style>