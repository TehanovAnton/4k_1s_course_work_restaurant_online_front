<script setup>

</script>

<template>
    <header class="block centrenize-content">
        HEADER
    </header>

    <div class="centrenize-content">
        <div class="menu block centrenize-content">
            MENU
        </div>
        <div class="content block centrenize-content">
            CONTENT
        </div>
    </div>

    <footer class="block centrenize-content">
        FOOTER
    </footer>
</template>

<style>
    .block {
        border: 3px solid black;
        padding: 3px;
    }

    .centrenize-content {
        display: flex;
        justify-content: space-around;        
    }    

    .menu {
        flex: 1;

        margin: 1.5px;
    }

    .content {
        flex: 1;

        margin: 1.5px;
    }
</style>
