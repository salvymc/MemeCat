<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ store.category }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-grid v-if="cats">
                <ion-row>
                    <ion-col size="6" size-sm="6" size-md="4" size-lg="3" v-for="item in cats['data']" :key="item.id">
                        <ion-card style="width: 100%; margin:0px; height: 100%;">
                            <img style="width: 100%;" :src="item['images']['fixed_width']['url']" />
                            <ion-card-header>
                                <ion-card-title>{{ item.username || 'MemeCat' }}</ion-card-title>
                                <ion-card-subtitle>{{ item.title || 'MemeCat' }}</ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <ion-button @click="shareImg(item['images']['fixed_width']['url'])" fill="outline"><ion-icon
                                        aria-hidden="true" fill="clear" size="meium"
                                        :icon="shareSocialOutline" /></ion-button>
                                <ion-button
                                    @click="saveImg(item.id, item.title || 'MemeCat', item['images']['fixed_width']['url'])"
                                    fill="outline" color="danger"><ion-icon aria-hidden="true" fill="clear" size="medium"
                                        :icon="heartHalfOutline" /></ion-button>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <div id="spinner_container" v-if="!cats">
                <ion-spinner></ion-spinner>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, toastController, IonBackButton, IonCol, IonGrid, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonSpinner } from '@ionic/vue';
import { heartHalfOutline, shareSocialOutline } from 'ionicons/icons';
import { store } from '../js/store'
import { Share } from '@capacitor/share';

let cats = ref<any>(null);
let offset = ref<number>(0);

async function fetchData() {
    const response = await fetch('https://api.giphy.com/v1/gifs/search?api_key=BK3RqadZSmCDUHeEbpuNbT17NoiNHbrR&q=' + store.category + '&limit=20&offset=0&rating=g&lang=it&bundle=messaging_non_clips');
    const data = await response.json();
    cats.value = data;
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