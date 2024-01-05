<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>🐱‍👤 Gatti</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Gatti</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
        <ion-row>
          <ion-col size="6" size-md="4" size-lg="3" v-for="item in cats" :key="item.id">
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { IonChip, IonCol, IonGrid, IonRow, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

let cats = ref<any>(null);

async function fetchData() {
  const response = await fetch('https://cataas.com/api/cats?skip=0&limit=12');
  const data = await response.json();
  cats.value = data;
}

onMounted(() => {
  fetchData();
})
</script>
