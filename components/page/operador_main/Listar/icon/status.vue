<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M14 2.66699V4.00033H13.3333L10 9.00033V14.667H6V9.00033L2.66667 4.00033H2V2.66699H14ZM4.26913 4.00033L7.33333 8.59659V13.3337H8.66667V8.59659L11.7309 4.00033H4.26913Z"
        :fill="color"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "black",
    },
  },
};
</script>
