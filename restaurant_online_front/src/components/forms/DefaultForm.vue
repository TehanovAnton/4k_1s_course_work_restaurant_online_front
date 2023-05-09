<script setup>
  const props = defineProps(['formLabel', 'primaryButton', 'secondaryButton'])
  const emits = defineEmits(['primaryBtnClick', 'secondaryBtnClick'])
</script>

<template>
  <form>
    <div class="row bg-light d-flex justify-content-around">
      <div class="col-lg-6">
        <div class="row bg-light">

          <div class="row bg-light mt-3 d-flex justify-content-center">
            <h5 class="col-lg-6 d-flex justify-content-center">{{ formLabel }}</h5>
          </div>

          <div class="d-flex justify-content-around">
            <slot />
          </div>
        </div>

        <div class="row bg-light">
          <div class="mb-3 d-flex justify-content-evenly">
            <button type="button" class="btn btn-outline-success" @click="$emit('primaryBtnClick')">
              {{ primaryButton }}
            </button>

            <button type="button" class="btn btn-outline-dark" @click="$emit('secondaryBtnClick')">
              {{ secondaryButton }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>