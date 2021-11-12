<template>
  <div class="full-row">
    <van-radio-group v-model="selectedLang" style="margin: 0 15px">
      <van-cell-group title=" " style="full-row">
        <van-cell
          :title="item"
          is-link
          v-for="(item, idx) in supportedCountries"
          :key="idx"
        >
          <template #right-icon> <van-radio name="1" /> </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>
<script src="./SelectLang.vue.ts" lang="ts"></script>
<style lang="less">
</style>