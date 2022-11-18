<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { useLayoutStore } from './stores/layout';

    const layout = useLayoutStore();
    const Layout = import(layout)
</script>

<template>
    <Layout />
</template>
