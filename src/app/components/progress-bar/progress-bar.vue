<template>
  <div
    class="progress"
    :style="{
    'width': percent+'%',
    'height': height,
    'background-color': canSuccess? color : failedColor,
    'opacity': show ? 1 : 0
  }"
  ></div>
</template>
<script src="./progress-bar.ts" lang="ts"></script>
