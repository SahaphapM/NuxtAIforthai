<template>
  <div>
    <input type="file" @change="fileStore.handleFileChange" />
    <button @click="fileStore.submitFileCap">Submit File Cap</button>
    <div><img v-if="fileStore.file" :src="fileStore.fileUrl" /></div>

    <div v-if="fileStore.caption">{{ fileStore.caption }}</div>
  </div>
  <div>
    <input type="file" @change="fileStore.handleFileChange" />
    <button @click="fileStore.submitFileSupResolution">
      Submit File Super Resolution
    </button>
    <div><img v-if="fileStore.file" :src="fileStore.fileUrl" /></div>
  </div>
</template>

<script lang="ts" setup>
const fileStore = useFileStore();
computed(() => (fileStore.file ? URL.createObjectURL(fileStore.file) : null));
</script>
