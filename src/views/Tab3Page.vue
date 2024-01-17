<template>
  <BaseTabPage title="Todo">
    <ul>
      <li>add books</li>
      <li>remove a book</li>
      <li>edit a book</li>
      <li>start a reading of a book</li>
      <li>make a running timer</li>
      <li>ability to add a reading manually</li>
    </ul>

    <p>Stretch goals</p>
    <ul>
      <li>animations</li>
      <li>make timer sit in notification panel</li>
      <li>add version number to app</li>
      <li>create a nice home page (with quick links)</li>
      <li>Writing notes against the book</li>
      <li>Record of all the books you have ready</li>
      <li>Ability to scan a books barcode</li>
      <li>Api integration for barcodesa (google books and open library)</li>
    </ul>

    <p>Inspo</p>
    <ul>
      <li>
        <a href="https://www.appcues.com/blog/mobile-app-modal-windows">Mobile Modals</a>
      </li>
      <li>
        <a href="https://blog.hubspot.com/website/api-books">Book apis out there</a>
      </li>
      <li>
        <a href="https://isbndb.com/book/9781619635197">Scrape this one</a>
      </li>
    </ul>
  </BaseTabPage>
</template>

<script setup lang="ts">
import BaseTabPage from './base/BaseTabPage.vue';
</script>
