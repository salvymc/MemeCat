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
      <ion-text class="ion-text-center ion-margin-top ion-margin-bottom">
        <h1>🔥Categorie in Voga</h1>
      </ion-text>
      <ion-chip @click="categoryPage($event)" v-for="item in category['data']">{{ item }}</ion-chip>
    </ion-content>
    <div id="spinner_container" v-if="!category">
      <ion-spinner></ion-spinner>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonSearchbar, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonChip, IonSpinner, useIonRouter, IonText } from '@ionic/vue';
import { store } from '../js/store'

let category = ref<any>(null);
const ionRouter = useIonRouter();

async function fetchData() {
  const response = await fetch('https://api.giphy.com/v1/trending/searches?api_key=BK3RqadZSmCDUHeEbpuNbT17NoiNHbrR');
  const data = await response.json();
  category.value = data;
}

function categoryPage(event: any) {
  store.category = event.target.innerHTML;
  ionRouter.push('/category_page/');
}

onMounted(() => {
  fetchData();
})

</script>

<style>
#spinner_container {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

ion-spinner {
  display: block;
  margin: auto;
}
</style>