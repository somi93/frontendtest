<template>
  <div class="chessboard-history">
    <div class="chessboard-history-title">
      <span>History</span>
    </div>
    <div ref="historyBox" class="chessboard-history-content">
      <template v-for="(item, i) in history.history">
        <div
            :class="i % 2 && 'chessboard-history-item-odd'"
            class="chessboard-history-item f-row align-center">
          <small>{{ i + 1 }}.</small>
          <div class="chessboard-history-item-square">
            <small>{{ item }}</small>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {watch, ref, nextTick} from 'vue';
import {useHistory} from '@/stores/history';

const history = useHistory();
const historyBox = ref(null);

watch(
    () => history,
    () => {
      nextTick(() => {
        historyBox.value.scrollTop = historyBox.value.scrollHeight
      })
    },
    {
      deep: true
    }
)
</script>

<style scoped>
.chessboard-history {
  width: 280px;
  max-width: calc(100vw - 250px);
  margin-left: calc(var(--margin-gap) * 2);
  background-color: var(--vt-c-accent);
  border-radius: 4px;
  padding: 0;
  overflow: hidden;
}

.chessboard-history-title {
  padding: var(--padding-gap) calc(var(--padding-gap) * 1.5);
  border-bottom: 2px solid var(--vt-c-primary);
}

.chessboard-history-title span {
  font-weight: bold;
}

@media (max-width: 600px) {
  .chessboard-history {
    width: 100%;
    max-width: 100%;
    height: auto !important;
    margin-left: 0;
    margin-top: var(--section-gap);
  }
}

@media (min-width: 600px) {
  .chessboard-history-content {
    /*Calculate main element margin with history title*/
    height: calc(100vh - (2 * var(--section-gap) + 16px));
    overflow-y: auto;
    scroll-behavior: smooth;
  }
}

.chessboard-history-item {
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding: 0 calc(var(--padding-gap) * 1.5);
}

.chessboard-history-item-odd {
  background-color: var(--vt-c-primary);
}

.chessboard-history-item-square {
  margin-left: var(--margin-gap);
}

.chessboard-history-item-square small {
  font-weight: bold;
}
</style>