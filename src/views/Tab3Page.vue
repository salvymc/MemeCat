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
      <ion-chip @click="categoryPage($event)" :outline="true" v-for="item in category['data']">{{ item }}</ion-chip>
      <div id="spinner_container" v-if="!category">
        <ion-spinner></ion-spinner>
      </div>
      <ion-item-divider></ion-item-divider>
      <ion-text v-if="query.length >= 3" class="ion-text-center ion-margin-top ion-margin-bottom">
        <h1>🔎Risultati per: {{ query }}</h1>
      </ion-text>
      <ion-grid v-if="gifs">
        <ion-row>
          <ion-col size="6" size-sm="6" size-md="4" size-lg="3" v-for="item in gifs['data']" :key="item.id">
            <ion-card style="width: 100%; margin:0px; height: 100%;">
              <img style="width: 100%;" :src="item['images']['fixed_width']['url']" />
              <ion-card-header>
                <ion-card-title>{{ item.username || 'MemeCat' }}</ion-card-title>
                <ion-card-subtitle>{{ item.title || 'MemeCat' }}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-button @click="shareImg(item['images']['fixed_width']['url'])" fill="outline"><ion-icon
                    aria-hidden="true" fill="clear" size="meium" :icon="shareSocialOutline" /></ion-button>
                <ion-button @click="saveImg(item.id, item.title || 'MemeCat', item['images']['fixed_width']['url'])"
                  fill="outline" color="danger"><ion-icon aria-hidden="true" fill="clear" size="medium"
                    :icon="heartHalfOutline" /></ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonSearchbar, IonPage, IonHeader, IonIcon, IonToolbar, toastController, IonTitle, IonCardContent, IonContent, IonButton, IonChip, IonItemDivider, IonSpinner, useIonRouter, IonText, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { shareSocialOutline, heartHalfOutline } from 'ionicons/icons';
import { Share } from '@capacitor/share';
import { store } from '../js/store'

let category = ref<any>(null);
let query = ref<string>("");
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
  query.value = event.target.value.toLowerCase();
  if (query.value.length >= 3) {
    getData(query.value);
  }
  if (query.value.length == 0) {
    gifs.value = null;
  }
}
async function shareImg(link: string) {
  await Share.share({
    url: link,
  });
}

async function presentToast() {
  const toast = await toastController.create({
    message: 'Immagine aggiunta ai preferiti',
    duration: 1500,
    position: 'bottom',
  })
  await toast.present();
};

function saveImg(id: any, name: string, link: string) {
  const request = indexedDB.open("MemeDB", 1);
  request.onupgradeneeded = (event: any) => {
    const db = event.target.result;
    const store = db.createObjectStore("Meme", { keyPath: "id" });
  }
  request.onsuccess = (event: any) => {
    const db = event.target.result;
    const transaction = db.transaction(["Meme"], "readwrite");
    const store = transaction.objectStore("Meme");
    store.add({
      id: id,
      name: name,
      link: link
    });
    transaction.oncomplete = () => {
      db.close();
      presentToast();
    };
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