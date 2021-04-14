<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <DatoImage :data="responsiveImage" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import DatoImage from "./components/DatoImage";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    DatoImage,
  },
  data() {
    return {
      responsiveImage: {
        alt: "Alternate text",
        aspectRatio: 1.5,
        base64:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLCgoLDhgQGg0NDh0VFhEgHx8tJSIfJSUlKy0vLSk2KSYdJTUlKC0yPjI1HTY4PTc1SC0yMi8BCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzU7Lzs7Oy87Lzs7OzsvOy8vOy8vL//AABEIABAAGAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAGBwAEBf/EACAQAAEDBAIDAAAAAAAAAAAAAAECAwUABAYREkETFIH/xAAWAQADAAAAAAAAAAAAAAAAAAABAgP/xAAaEQABBQEAAAAAAAAAAAAAAAACAAEDESES/9oADAMBAAIRAxEAPwDcVkTFqoFagBRDF5XavsjS0n7SgkbB+Tb8YdUnfYNWoiPuopkJLy1Adk0Y3Ig1K8dHiNMxmWlMKVyFSlplsq965b5HZOqlDsxylGaORytl/9k=",
        bgColor: "#3e8bb2",
        height: 2304,
        sizes: "(max-width: 3456px) 100vw, 3456px",
        src:
          "https://www.datocms-assets.com/45563/1618330573-yovan-verma-myupfxl4xj0-unsplash.jpg",
        srcSet:
          "https://www.datocms-assets.com/45563/1618330573-yovan-verma-myupfxl4xj0-unsplash.jpg?dpr=0.25 864w,https://www.datocms-assets.com/45563/1618330573-yovan-verma-myupfxl4xj0-unsplash.jpg?dpr=0.5 1728w,https://www.datocms-assets.com/45563/1618330573-yovan-verma-myupfxl4xj0-unsplash.jpg?dpr=0.75 2592w,https://www.datocms-assets.com/45563/1618330573-yovan-verma-myupfxl4xj0-unsplash.jpg 3456w",
        title: "My title",
        webpSrcSet:
          "https://www.datocms-assets.com/45563/1618330573-yovan-verma-myupfxl4xj0-unsplash.jpg?dpr=0.25&fm=webp 864w,https://www.datocms-assets.com/45563/1618330573-yovan-verma-myupfxl4xj0-unsplash.jpg?dpr=0.5&fm=webp 1728w,https://www.datocms-assets.com/45563/1618330573-yovan-verma-myupfxl4xj0-unsplash.jpg?dpr=0.75&fm=webp 2592w,https://www.datocms-assets.com/45563/1618330573-yovan-verma-myupfxl4xj0-unsplash.jpg?fm=webp 3456w",
        width: 3456,
      },
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
