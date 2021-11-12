<template>
  <van-row class="full-row">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="full-row">
      <van-empty
        description="描述文字"
        v-if="games.length == 0"
        style="height: 100%"
      />
      <van-grid :column-num="3" :gutter="10">
        <van-grid-item
          v-for="(game, idx) in games"
          :key="idx"
          icon="photo-o"
          :text="game.title"
          @click="onItemClick(game)"
        >
          <van-image width="330" height="220" :src="game.snap" radius="5" />
          <div style="width: 330px; margin-top: 10px">
            <van-progress
              :percentage="95"
              stroke-width="8"
              color="linear-gradient(to right, #be99ff, #7232dd)"
            />
          </div>

          <p>{{ game.title }}</p>
        </van-grid-item>
      </van-grid>
    </van-pull-refresh>
  </van-row>
</template>

<script lang="ts" src="./GameHome.vue.ts"></script>

<style scoped>
.full-row {
  overflow: auto;
}
</style>
