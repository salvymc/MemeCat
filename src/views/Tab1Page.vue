<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>😼 Gatti</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="changeColSize()">
            <ion-icon slot="icon-only" :icon="gridOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col :size="size" size-sm="6" size-md="4" size-lg="3" v-for="item in cats" :key="item.id">
            <ion-card>
              <img alt="" :src="'https://cataas.com/cat/' + item._id" />
              <ion-card-header>
                <ion-card-title>Card Title</ion-card-title>
                <ion-card-subtitle>{{ item._id }}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content style="overflow: auto">
                <ion-card-content style="display: inline-flex;inline-size: max-content;padding: 0px;">
                  <ion-chip :outline="true" v-for="tag in item.tags" :key="item.id">
                    {{ tag }}
                  </ion-chip>
                </ion-card-content>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-button fill="outline">Outline</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonButton, IonButtons, IonIcon, IonChip, IonCol, IonGrid, IonRow, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { gridOutline } from 'ionicons/icons';

let cats = ref<any>(null);
let size = ref<string>("12");

async function fetchData() {
  const response = await fetch('https://cataas.com/api/cats?skip=0&limit=12');
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
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb:vertical {
  margin: 5px;
  background-color: #999;
  -webkit-border-radius: 5px;
}
</style>