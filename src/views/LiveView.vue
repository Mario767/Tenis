<template>
  <div>
    <img src="https://i.imgur.com/r5391te.jpeg" alt="Slika" style="width: 100%; max-height: 300px; object-fit: cover;" />
    <LiveScore :turniri="turniriData" v-if="turniriData.length > 0" />
  </div>
</template>

<script>
import LiveScore from '../components/LiveScore.vue';
import axios from 'axios';

export default {
  components: {
    LiveScore,
  },
  data() {
    return {
      turniriData: [],
    };
  },
  mounted() {
    this.dohvatiLiveTurnire();
    setInterval(this.dohvatiLiveTurnire, 6000000); // Postavljamo poziv na svakih 15 sekundi (15 * 1000 milisekundi)
  },
  methods: {
    dohvatiLiveTurnire() {
      const options = {
        method: 'GET',
        url: 'https://sports-live-scores.p.rapidapi.com/tennis/live',
        headers: {
          'x-rapidapi-host': 'sports-live-scores.p.rapidapi.com',
          'x-rapidapi-key': '5beca7e0a7msh1d0046129924e2fp14ba9ejsn8e48bacb26b5',
        },
      };

      axios
        .request(options)
        .then((response) => {
          this.turniriData = response.data.matches || [];
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
