<script setup>
  const props = defineProps(['label', 'primaryButton', 'secondaryButton'])
  const emits = defineEmits(['wrapClick', 'primaryBtnClick', 'secondaryBtnClick'])
</script>

<template>
  <div class="row bg-transparent">
    <div class="card" @click="$emit('wrapClick')">
      <div class="card-body">
        <div class="row bg-transparent">
          <h1 class="card-title d-flex justify-content-around">{{ label }}</h1>
        </div>

        <slot />

        <div class="row bg-light">
          <div class="mb-3 d-flex justify-content-evenly">
            <button v-if="primaryButton.enable"
              type="button" class="btn btn-outline-success" @click="$emit('primaryBtnClick')"
            >
              {{ primaryButton.label }}
            </button>

            <button v-if="secondaryButton.enable"
              type="button" class="btn btn-outline-dark" @click="$emit('secondaryBtnClick')"
            >
              {{ secondaryButton.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
