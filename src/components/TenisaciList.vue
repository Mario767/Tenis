<template>
  <div>
    <div v-for="(tenisac, index) in tenisaci" :key="index">
      <h2>{{ tenisac.ranking }}. {{ tenisac.ime }}</h2>
      <p>Bodovi: {{ tenisac.bodovi }}</p>
      <p>Nacionalnost: {{ tenisac.nacionalnost }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tenisaci: {
      type: Array,
      required: true,
    },
  },
};
</script>
