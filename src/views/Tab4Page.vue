<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>❤ Preferiti</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid v-if="gifs">
        <ion-row>
          <ion-col size="6" size-sm="6" size-md="4" size-lg="3" v-for="item in gifs" :key="item.id">
            <ion-card style="width: 100%; margin:0px; height: 100%;">
              <img style="width: 100%;" :src="item.link" />
              <ion-card-header>
                <ion-card-subtitle>{{ item.name || 'MemeCat' }}</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <div id="spinner_container" v-if="!gifs">
      <ion-spinner></ion-spinner>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonSearchbar, IonPage, IonHeader, IonIcon, IonToolbar, IonTitle, IonContent, IonSpinner, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/vue';
import { shareSocialOutline, heartOutline } from 'ionicons/icons';

let gifs = ref<any>(null);

function getfavourites() {
  const request = indexedDB.open("MemeDB", 1);

  request.onupgradeneeded = (event: any) => {
    const db = event.target.result;
    const store = db.createObjectStore("Meme", { keyPath: "id" });
  };

  request.onsuccess = (event: any) => {
    const db = event.target.result;
    const transaction = db.transaction("Meme", "readonly");
    const objectStore = transaction.objectStore("Meme");

    objectStore.getAll().onsuccess = (event: any) => {
      gifs.value = event.target.result;
      console.log(gifs);
    };
  };
}

onMounted(() => {
  getfavourites();
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