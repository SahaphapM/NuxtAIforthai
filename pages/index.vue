<template>
  <div>
    <br />
    <input type="file" @change="store.handleFileChange" />
    <button @click="handleSubmit">Submit File Cap</button>
    <div><img :src="store.getFileUrl" /></div>
    <div>{{ store.caption ?? "" }}</div>
    <br />
    <br />
    <div v-if="store.isLoading" class="loader"></div>
    <div v-if="!store.isLoading" class="flex">
      Result Image After Super Resolution
    </div>
    <br />
    <br />
    <div><img :src="store.getSRfileUrl" /></div>
  </div>
</template>

<script lang="ts" setup>
const store = useFileStore();

async function handleSubmit() {
  // await store.submitFileCap();
  if (store.file) {
    store.isLoading = true;
    await store.submitFileSupResolution();
    store.isLoading = false;
  }
  if (store.SRurl) {
    store.isLoading = true;
    await store.getImageWithHeader();
    store.isLoading = false;
  }
}
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 120px;
  height: 20px;
  background: linear-gradient(#000 0 0) 0/0% no-repeat #ddd;
  animation: l1 2s infinite linear;
}
@keyframes l1 {
  100% {
    background-size: 100%;
  }
}
.flex {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
