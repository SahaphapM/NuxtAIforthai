<template>
  <div>
    <input type="file" @change="store.handleFileChange" />
    <button @click="handleSubmit">Submit File Cap</button>
    <div><img :src="store.getFileUrl" /></div>
    <div>{{ store.caption ?? "" }}</div>
    <div><img :src="store.getSRfileUrl" /></div>
  </div>
</template>

<script lang="ts" setup>
const store = useFileStore();
async function handleSubmit() {
  await store.submitFileCap();
  if (store.file) {
    await store.submitFileSupResolution();
  }
}
</script>
