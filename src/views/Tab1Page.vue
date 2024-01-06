<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>🚀 MemeLand</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="changeColSize()">
            <ion-icon slot="icon-only" :icon="size === '12' ? gridOutline : squareOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid v-if="cats">
        <ion-row>
          <ion-col :size="size" size-sm="6" size-md="4" size-lg="3" v-for="item in cats['data']" :key="item.id">
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
      <div id="spinner_container" v-if="!cats">
        <ion-spinner></ion-spinner>
      </div>
      <ion-button fill="outline">Outline</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonSpinner, IonButton, IonButtons, IonIcon, IonCol, IonGrid, IonRow, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { gridOutline, squareOutline } from 'ionicons/icons';

let cats = ref<any>(null);
let size = ref<string>("12");

async function fetchData() {
  const response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=BK3RqadZSmCDUHeEbpuNbT17NoiNHbrR&limit=20&offset=0&rating=g&bundle=messaging_non_clips');
  const data = await response.json();
  cats.value = data;
}

function changeColSize() {
  size.value = (size.value === "12") ? "6" : "12";
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