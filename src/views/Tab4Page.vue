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
              <ion-card-content>
                <ion-button @click="shareImg(item.link)" fill="outline"><ion-icon aria-hidden="true" fill="clear"
                    size="meium" :icon="shareSocialOutline" /></ion-button>
                <ion-button @click="deleteFavourites(item.id)" fill="outline" color="danger"><ion-icon aria-hidden="true"
                    fill="clear" size="meium" :icon="trashOutline" /></ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <div id="spinner_container" v-if="!gifs">
      <ion-spinner></ion-spinner>
    </div>
    <div id="spinner_container" v-if="gifs.length === 0">
      <img id="empty_gif" src="../theme/img/empty.gif">
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage, IonHeader, IonIcon, IonToolbar, onIonViewDidEnter, IonTitle, IonCardContent, toastController, IonButton, IonContent, IonSpinner, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/vue';
import { trashOutline, shareSocialOutline } from 'ionicons/icons';
import { Share } from '@capacitor/share';


let gifs = ref<any>([]);

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
    };
  };
}

async function shareImg(link: string) {
  await Share.share({
    url: link,
  });
}

async function presentToast() {
  const toast = await toastController.create({
    message: 'Immagine Eliminata',
    duration: 1500,
    position: 'bottom',
  })
  await toast.present();
};

async function deleteFavourites(id: any) {
  const dbName = "MemeDB";
  const objectStoreName = "Meme";

  const request = indexedDB.open(dbName);

  request.onsuccess = (event: any) => {
    const db = request.result;

    const transaction = db.transaction(objectStoreName, "readwrite");
    const objectStore = transaction.objectStore(objectStoreName);

    objectStore.delete(id);
    console.log("Successfully deleted favourite item with ID:", id);

    transaction.oncomplete;
    db.close();
    presentToast();
    getfavourites();
  }
}
onIonViewDidEnter(() => {
  getfavourites();
});

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

ion-spinner,
#empty_gif {
  display: block;
  margin: auto;
}
</style>