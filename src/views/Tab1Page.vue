<template>
  <BaseTabPage title="Books">
    All your books here

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @tap="onAdd">
        <ion-icon :icon="add" />
      </ion-fab-button>
    </ion-fab>
  </BaseTabPage>
</template>

<script setup lang="ts">
import { IonFab, IonIcon, IonFabButton } from '@ionic/vue';
import { add } from 'ionicons/icons';
import BaseTabPage from './base/BaseTabPage.vue';

const onAdd = () => {
  console.dir('--- on add');
};
</script>
