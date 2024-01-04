<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card v-for="item in cats" :key="item.id">
        <img alt="" :src="'https://cataas.com/api/' + item._id" />
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>{{ item._id }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{ item.tags[0] }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

let cats = ref<any>(null);

async function fetchData() {
  const response = await fetch('https://cataas.com/api/cats');
  const data = await response.json();
  cats.value = data;
}

onMounted(() => {
  fetchData();
})
</script>
