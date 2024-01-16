<template>
  <ion-page>
    <ion-content>
      <div class="centered-content">
        <slot></slot>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
</script>

<style scoped>
.centered-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 3rem;
}
</style>
