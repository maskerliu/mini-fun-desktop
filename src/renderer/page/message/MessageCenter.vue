<template>
  <van-row class="full-row">
    <van-col span="6" class="full-row">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        class="full-row"
      >
        <van-empty
          description="描述文字"
          v-if="sessions.length == 0"
          style="height: 100%"
        />
        <van-list
          v-model="isLoading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <div v-for="(value, name, key) in sessions" :key="key">
            <van-cell
              :key="value[1].sid"
              size="large"
              is-link
              clickable
              center
              @click="updateSid(value[1].sid)"
            >
              <template #title>
                <van-row>
                  <van-image
                    width="45px"
                    height="45px"
                    radius="7px"
                    v-if="value[1].type !== 2"
                    :src="value[1].thumb"
                  />
                  <van-icon
                    :badge="value[1].messages.length"
                    :name="value[1].thumb"
                    style="margin-top: 10px"
                    class="iconfont"
                    class-prefix="icon"
                    size="40"
                    color="#FF8926"
                    v-else
                  />
                  <div style="padding-left: 15px">
                    <span class="snap-title">{{ value[1].title }}</span>
                    <span class="snap-timestamp">{{
                      value[1].messages[
                        value[1].messages.length - 1
                      ].timestamp.toFormat("HH:mm")
                    }}</span>
                    <br />
                    <div class="snap-desc">{{ value[1].snapshot }}</div>
                  </div>
                </van-row>
              </template>
            </van-cell>
          </div>
        </van-list>
      </van-pull-refresh>
    </van-col>

    <van-col span="18" class="full-row">
      <session></session>
    </van-col>
  </van-row>
</template>

<script lang="ts" src="./MessageCenter.vue.ts"></script>

<style scoped>
.full-row {
  overflow: auto;
}

.snap-title {
  font-size: 15px;
  font-weight: bold;
}
.snap-timestamp {
  font-size: 10px;
  color: grey;
  position: absolute;
  right: 10px;
  top: 5px;
}

.snap-desc {
  font-size: 12px;
  color: grey;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
