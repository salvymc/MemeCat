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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCol, IonGrid, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonSpinner } from '@ionic/vue';
import { store } from '../js/store'

let cats = ref<any>(null);
let offset = ref<number>(0);

async function fetchData() {
    const response = await fetch('https://api.giphy.com/v1/gifs/search?api_key=BK3RqadZSmCDUHeEbpuNbT17NoiNHbrR&q=' + store.category + '&limit=20&offset=0&rating=g&lang=it&bundle=messaging_non_clips');
    const data = await response.json();
    cats.value = data;
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