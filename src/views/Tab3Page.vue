<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>🚀 MemeCat - Categorie</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar placeholder="Cerca..."></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="category">
      <ion-title>🔥 Categorie in voga</ion-title>
      <ion-chip v-for="item in category['data']">{{ item }}</ion-chip>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonSearchbar, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonChip } from '@ionic/vue';

let category = ref<any>(null);

async function fetchData() {
  const response = await fetch('https://api.giphy.com/v1/trending/searches?api_key=BK3RqadZSmCDUHeEbpuNbT17NoiNHbrR');
  const data = await response.json();
  category.value = data;
}

onMounted(() => {
  fetchData();
})
</script>
