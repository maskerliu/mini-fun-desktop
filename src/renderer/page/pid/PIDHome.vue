<template>
  <div class="parent">
    <DraggableResizable
      :initW="110"
      :initH="120"
      v-model:x="x"
      v-model:y="y"
      v-model:w="w"
      v-model:h="h"
      v-model:active="active"
      :draggable="true"
      :resizable="true"
      @activated="print('activated')"
      @deactivated="print('deactivated')"
      @drag-start="print('drag-start')"
      @resize-start="print('resize-start')"
      @dragging="print('dragging')"
      @resizing="print('resizing')"
      @drag-end="print('drag-end')"
      @resize-end="print('resize-end')"
    >
      This is a test
    </DraggableResizable>

    <DraggableResizable
      :initW="110"
      :initH="120"
      v-model:x="x"
      v-model:y="y"
      v-model:w="w"
      v-model:h="h"
      v-model:active="active"
      :draggable="true"
      :resizable="true"
      @activated="print('activated')"
      @deactivated="print('deactivated')"
      @drag-start="print('drag-start')"
      @resize-start="print('resize-start')"
      @dragging="print('dragging')"
      @resizing="print('resizing')"
      @drag-end="print('drag-end')"
      @resize-end="print('resize-end')"
    >
      This is a example
    </DraggableResizable>
    <span>p & id </span>
  </div>
</template>
<script lang="ts" src="./PIDHome.vue.ts"></script>
<style lang="css" scoped>
.parent {
  width: 90%;
  height: 80%;
  position: absolute;
  border: 1px solid #000;
  user-select: none;
}
</style>