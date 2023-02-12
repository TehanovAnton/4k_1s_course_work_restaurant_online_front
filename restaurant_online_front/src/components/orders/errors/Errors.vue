<script setup>
    const props = defineProps([
        'errors'
    ])

    const isErrorsPresent = () => {
        return props.errors.length != 0;
    }
</script>

<template>
    <div v-if="isErrorsPresent()" v-for="error in props.errors" class="errors">
        <p>
            {{ error }}
        </p>
    </div>
</template>
