<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>🚀 MemeCat - Categorie</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar placeholder="Cerca..." @ionInput="handleInput($event)"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="category">
      <ion-text class="ion-text-center ion-margin-top ion-margin-bottom">
        <h1>🔥Categorie in Voga</h1>
      </ion-text>
      <ion-chip @click="categoryPage($event)" v-for="item in category['data']">{{ item }}</ion-chip>
      <div id="spinner_container" v-if="!category">
        <ion-spinner></ion-spinner>
      </div>
      <ion-grid v-if="gifs">
        <ion-row>
          <ion-col size="6" size-sm="6" size-md="4" size-lg="3" v-for="item in gifs['data']" :key="item.id">
            <ion-card style="width: 100%; margin:0px; height: 100%;">
              <img style="width: 100%;" :src="item['images']['fixed_width']['url']" />
              <ion-card-header>
                <ion-card-title>{{ item.username || 'MemeCat' }}</ion-card-title>
                <ion-card-subtitle>{{ item.title || 'MemeCat' }}</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonSearchbar, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonChip, IonSpinner, useIonRouter, ionelem, IonText, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { store } from '../js/store'

let category = ref<any>(null);
let gifs = ref<any>(null);
const ionRouter = useIonRouter();

async function fetchData() {
  const response = await fetch('https://api.giphy.com/v1/trending/searches?api_key=BK3RqadZSmCDUHeEbpuNbT17NoiNHbrR');
  const data = await response.json();
  category.value = data;
}

async function getData(query: string) {
  const response = await fetch('https://api.giphy.com/v1/gifs/search?api_key=BK3RqadZSmCDUHeEbpuNbT17NoiNHbrR&q=' + query + '&limit=32&offset=0&rating=g&lang=it&bundle=messaging_non_clips');
  const data = await response.json();
  gifs.value = data;
}

function categoryPage(event: any) {
  store.category = event.target.innerHTML;
  ionRouter.push('/category_page/');
}

function handleInput(event: any) {
  const query = event.target.value.toLowerCase();
  if (query.length >= 3) {
    getData(query);
  }
  if (query.length == 0) {
    gifs.value = null;
  }
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