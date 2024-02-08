<template>
  <div>
    <div class="chessboard">
      <template v-for="row in chessboardSquares">
        <div class="f-row">
          <template v-for="square in row">
            <div
                @click="updateHistory(square)"
                class="f-col chessboard-square"
                :class="(square.y + square.x) % 2 ? 'chessboard-square-light' : 'chessboard-square-dark'">
              <div v-if="isSquareActive(square)" class="chessboard-square-active"></div>
              <span
                  v-if="square.x === 1"
                  class="chessboard-square-axis-mark"
                  :class="square.y % 2 ? 'chessboard-square-axis-color-dark' : 'chessboard-square-axis-color-light'">
              {{ square.y }}
            </span>
              <span
                  v-if="square.y === 1"
                  class="chessboard-square-axis-mark chessboard-square-x-axis-mark"
                  :class="square.x % 2 ? 'chessboard-square-axis-color-dark' : 'chessboard-square-axis-color-light'">
                {{ square.textValue }}
              </span>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useHistory} from '@/stores/history'

const history = useHistory()

const updateHistory = square => {
  history.updateHistory(square.value);
}

const isSquareActive = (square) => {
  return history.history.includes(square.value)
}

const chessboardSquares = computed(() => {
  let squares = [];
  //Iterate through y axis
  for (let y = 8; y >= 1; y--) {
    let row = [];
    //iterate through x axis
    for (let x = 1; x <= 8; x++) {
      //Generate square text value
      const textValue = String.fromCharCode(x + 64);
      row.push({x, y, textValue, value: textValue + y})
    }
    squares.push(row)
  }
  return squares;
})
</script>

<style scoped>
.chessboard {
  border: 2px solid var(--vt-c-secondary);
  border-radius: 4px;
}

@media (min-width: 600px) {
  .chessboard {
    overflow: hidden;
  }
}

.chessboard-square {
  aspect-ratio: 1;
  color: #fff;
  position: relative;
  /* Calculate main element margin with history title and divide by number of squares per row */
  height: calc((100vh - 2 * var(--section-gap)) / 8);
  /* Calculate sidebar width with margins and divide by number of squares per row */
  max-height: calc((100vw - 320px) / 8);
}

@media (max-width: 600px) {
  .chessboard-square {
    width: calc(100% / 8);
    max-width: calc(100vw / 8);
    height: auto !important;
    max-height: fit-content !important;
  }
}

.chessboard-square-dark {
  background-color: var(--vt-c-secondary);
}

.chessboard-square-light {
  background-color: var(--vt-c-primary);
}

.chessboard-square-axis-color-light {
  color: var(--vt-c-secondary);
}

.chessboard-square-axis-color-dark {
  color: var(--vt-c-primary);
}

.chessboard-square-axis-mark {
  font-size: 1rem;
}

.chessboard-square-x-axis-mark {
  position: absolute;
  bottom: 4px;
  right: 4px;
}

.chessboard-square-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 200, 20, .75);
}
</style>