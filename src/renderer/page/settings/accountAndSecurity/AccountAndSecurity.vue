<template>
  <div class="full-row">
    <van-cell-group inset title=" " style="full-row">
      <van-cell title="头像" clickable center>
        <template #right-icon>
        <van-image
          round
          width="5rem"
          height="5rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        </template>
      </van-cell>
      <van-cell title="ID" value="maskerliu" />
      <van-cell title="昵称" value="暴走的兔子" is-link />

    </van-cell-group>

    <van-cell-group inset title=" ">
      <van-cell title="我的地址" is-link />
      <van-cell title="我的发票" is-link/>
    </van-cell-group>

    <van-cell-group inset title=" ">
      <van-cell title="登陆设备管理" is-link to="/settings/accountAndSecurity/loginDeviceMgr" />
      <van-cell title="密码"  is-link />
      <van-cell title="邮箱地址" value="未绑定" is-link />
    </van-cell-group>
  </div>
</template>

<script src="./AccountAndSecurity.vue.ts" lang="ts"></script>

<style>
</style>