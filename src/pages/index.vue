<template>
  <div class="f-row chessboard-box">
    <chessboard></chessboard>
    <chessboard-history></chessboard-history>
  </div>
</template>

<script setup>
import Chessboard from "@/components/Chessboard.vue";
import ChessboardHistory from "@/components/ChessboardHistory.vue";
</script>

<style scoped>
.chessboard-box{
  justify-content: center;
}

@media (max-width: 600px) {
  .chessboard-box {
    flex-direction: column;
  }
}
</style>