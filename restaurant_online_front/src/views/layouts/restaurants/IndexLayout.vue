<script setup>
import HeaderView from '../../restaurants/v1/components/HeaderView.vue';
import ModelsOverviewView from '../../restaurants/v1/components/ModelsOverviewView.vue';
import ModelsContentView from '../../restaurants/v1/components/ModelsContentView.vue';
import FooterView from '../../restaurants/v1/components/FooterView.vue';
</script>

<template>
  <HeaderView />

  <ModelsOverviewView>
    <ModelsContentView />
  </ModelsOverviewView>

  <FooterView />
</template>