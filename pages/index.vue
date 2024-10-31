<template>
  <div class="page-container">
    <h1>AI For Thai</h1>
    <div>
      <input type="file" @change="store.handleFileChange" />
      <button class="btn" @click="handleSubmit">Submit File Cap</button>
    </div>
    <div class="container"><img :src="store.getFileUrl" /></div>
    <div>{{ store.caption ?? "" }}</div>
    <br />
    <br />
    <div v-if="store.isLoading" class="loader"></div>
    <br />
    <br />
    <section>
      <div>After Super Resolution:</div>
      <div class="container">
        <img :src="store.getSRfileUrl" />
      </div>
    </section>
    <section>
      <div>Human detection:</div>
      <div class="container"><img :src="store.detectionResult" /></div>
    </section>
    <section>
      <div>Human Heatmap:</div>
      <div class="container"><img :src="store.heatmapResult" /></div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const store = useFileStore();

async function handleSubmit() {
  store.isLoading = true;
  if (store.file) {
    await store.submitFileSupResolution();
    await store.detectHuman(store.getFile!);
    await store.detectHeat(store.getFile!);
  }
  if (store.SRurl) {
    await store.fetchImageWithHeader();
  }
  store.isLoading = false;
}
</script>

<style scoped>
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

* {
  font-family: Verdana;
}

.btn {
  padding: 0.5rem;
  border: transparent;
  border-radius: 5px;
}
.btn:hover {
  background: rgb(45, 122, 223);
  cursor: pointer;
}

h1 {
  background: linear-gradient(90deg, #f00, #f0f);
  background-clip: text;
  color: transparent;
  text-align: center;
}

.page-container {
  margin: 0 auto;
  width: 1280px;
}
.container {
  display: flex;
  margin: 0 auto;
  width: 400px;
  height: 400px;
}
</style>
