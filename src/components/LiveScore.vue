<template>
  <div>
    <h2>Live Turniri</h2>
    <div v-for="(turnir, index) in turniri" :key="index" class="mb-4">
      <v-card>
        <v-card-title>{{ turnir.Tournament }}</v-card-title>
        <v-card-text>
          
          <div class="row">
            <p class="cell player" v-if="turnir['Home Player'] !== 'None'">{{ turnir['Home Player'] }}</p>
            <p class="cell" v-if="turnir['Set5 Player 1'] !== 'None'"> {{ turnir['Set5 Player 1'] }}</p>
            <p class="cell" v-if="turnir['Set4 Player 1'] !== 'None'"> {{ turnir['Set4 Player 1'] }}</p>
            <p class="cell" v-if="turnir['Set3 Player 1'] !== 'None'"> {{ turnir['Set3 Player 1'] }}</p>
            <p class="cell" v-if="turnir['Set2 Player 1'] !== 'None'"> {{ turnir['Set2 Player 1'] }}</p>
            <p class="cell" v-if="turnir['Set1 Player 1'] !== 'None'"> {{ turnir['Set1 Player 1'] }}</p>
            
          </div>
          <div class="row">
            <p class="cell player" v-if="turnir['Away Player'] !== 'None'"> {{ turnir['Away Player'] }}</p>
            <p class="cell" v-if="turnir['Set5 Player 2'] !== 'None'">{{ turnir['Set5 Player 2'] }}</p>
            <p class="cell" v-if="turnir['Set4 Player 2'] !== 'None'">{{ turnir['Set4 Player 2'] }}</p>
            <p class="cell" v-if="turnir['Set3 Player 2'] !== 'None'">{{ turnir['Set3 Player 2'] }}</p>
            <p class="cell" v-if="turnir['Set2 Player 2'] !== 'None'"> {{ turnir['Set2 Player 2'] }}</p>
            <p class="cell" v-if="turnir['Set1 Player 2'] !== 'None'">{{ turnir['Set1 Player 2'] }}</p>
            
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    turniri: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isClosestSet(turnir, player) {
      const setScores = [
        turnir['Set5 Player 1'],
        turnir['Set4 Player 1'],
        turnir['Set3 Player 1'],
        turnir['Set2 Player 1'],
        turnir['Set1 Player 1'],
        turnir['Set5 Player 2'],
        turnir['Set4 Player 2'],
        turnir['Set3 Player 2'],
        turnir['Set2 Player 2'],
        turnir['Set1 Player 2'],
      ];
      const playerName = player === 'Player 1' ? turnir['Home Player'] : turnir['Away Player'];
      const closestSetIndex = setScores.findIndex(score => score !== 'None' && !isNaN(score));
      const closestSetName = closestSetIndex !== -1 ? setScores[closestSetIndex] : '';
      return closestSetName === playerName;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}

.cell {
  flex-basis: 3%;
  margin-right: 5px;
  margin-left: 15px;
}
.player {
  flex-basis: 30%;
}
  


.bold {
  font-weight: bold;
  color: black;
}
</style>
