<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Categorie</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <h1>Page Two</h1>
            <p>Use the back button to navigate to the previous page.</p>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent } from '@ionic/vue';
</script>