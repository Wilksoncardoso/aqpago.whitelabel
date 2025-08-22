<template>
    <div class="number__animed">{{ displayNumber }}</div>
  </template>
  
  <script>
  export default {
    props: {
      finalNumber: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        displayNumber: 0 // Número que será incrementado
      };
    },
    watch: {
      finalNumber(newVal) {
        this.animateNumber(newVal);
      }
    },
    mounted() {
      this.animateNumber(this.finalNumber);
    },
    methods: {
      animateNumber(finalNumber) {
        const duration = 2000; // Duração da animação em milissegundos
        const frameDuration = 1000 / 100; // Aproximadamente 60 frames por segundo
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
  
        const counter = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;
          this.displayNumber = Math.floor(progress * finalNumber);
  
          if (frame === totalFrames) {
            clearInterval(counter);
          }
        }, frameDuration);
      }
    }
  };
  </script>
  
  <style>
  .number__animed {
    font-size: 1em;
    font-weight: bold;
  }
  </style>