<template>
    <div class="div-loader_white" :style="styles">
        <loader-component v-if="componentLoader" />
    </div>
</template>
<script>

import LoaderComponent from './LoaderComponent.vue';

export default {
    name: 'LoaderContainerComponent',
    props: ['styles', 'componentLoader'],
    components: {
        LoaderComponent
    }
};
</script>

<style >
.div-loader_white {
  background-color: rgb(255 255 255 / 70%);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 24;
}
</style>