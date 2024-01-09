<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>🚀 MemeCat - Meme</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="changeColSize()">
            <ion-icon slot="icon-only" :icon="size === '12' ? gridOutline : squareOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-grid v-if="cats">
        <ion-row>
          <ion-col :size="size" size-sm="6" size-md="4" size-lg="3" v-for="item in cats['data']" :key="item.id">
            <ion-card style="width: 100%; margin:0px; height: 100%;">
              <img style="width: 100%;" :src="item['images']['fixed_width']['url']" @click="handleZoom($event)" />
              <ion-card-header>
                <ion-card-title>{{ item.username || 'MemeCat' }}</ion-card-title>
                <ion-card-subtitle>{{ item.title || 'MemeCat' }}</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-modal id="modal" ref="modal" :is-open="isOpen" @willDismiss="onWillDismiss">
        <ion-content>
          <img style="width:100%" :src="imgZoom">
        </ion-content>
      </ion-modal>
      <div id="spinner_container" v-if="!cats">
        <ion-spinner></ion-spinner>
      </div>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonModal, IonRefresher, IonRefresherContent, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent, IonSpinner, IonButton, IonButtons, IonIcon, IonCol, IonGrid, IonRow, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { gridOutline, squareOutline } from 'ionicons/icons';

let cats = ref<any>(null);
let size = ref<string>("12");
let offset = ref<number>(0);
let isOpen = ref<boolean>(false);
let imgZoom = ref<string>("");

async function fetchData() {
  const response = await fetch('https://api.giphy.com/v1/gifs/search?api_key=BK3RqadZSmCDUHeEbpuNbT17NoiNHbrR&q=meme&limit=20&offset=0&rating=g&lang=it&bundle=messaging_non_clips');
  const data = await response.json();
  cats.value = data;
}

async function infinityGif() {
  offset.value += 20;
  const response = await fetch('https://api.giphy.com/v1/gifs/search?api_key=BK3RqadZSmCDUHeEbpuNbT17NoiNHbrR&q=meme&limit=25&offset=' + offset.value + '&rating=g&lang=it&bundle=messaging_non_clips');
  const data = await response.json();
  if (offset.value <= data['pagination']['total_count']) {
    cats.value.data = [...cats.value.data, ...data.data];
  }
}

const handleRefresh = (event: any) => {
  fetchData();
  setTimeout(() => event.target.complete(), 2000);
};

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  infinityGif();
  setTimeout(() => ev.target.complete(), 500);
};

function changeColSize() {
  size.value = (size.value === "12") ? "6" : "12";
}

function handleZoom(event: any) {
  imgZoom.value = event.target.src;
  isOpen.value = true;
}

function onWillDismiss() {
  isOpen.value = false;
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

ion-modal {
  --height: 50%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

@media(min-width:750px) {
  ion-modal {
    --height: 100vh;
  }
}
</style>