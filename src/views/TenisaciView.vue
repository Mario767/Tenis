<template>
  <v-sheet>
    <v-container>
      <h1>Lista tenisača</h1>

      <v-row>
        <v-col cols="12" md="3" class="mb-4">
          <v-select
            v-model="searchType"
            :items="searchOptions"
            label="Pretraži po"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="5" class="mb-4">
          <v-text-field
            v-model="searchText"
            label="Pretraga"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2" class="mb-4">
          <v-btn color="light-blue" @click="pretrazi" x-large class="white--text">Pretraži</v-btn>
        </v-col>
      </v-row>

      <v-simple-table v-if="showTable">
        <template v-slot:default>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Logo</th>
              <th>Ime</th>
              <th>Nacionalnost</th>
              <th>Bodovi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tenisac, index) in paginatedTenisaci" :key="index">
              <td>{{ tenisac.ranking }}</td>
              <td>
                <img :src="tenisac.logo" alt="Logo" height="50" />
              </td>
              <td>{{ tenisac.imePrezime }}</td>
              <td>{{ tenisac.nacionalnost }}</td>
              <td>{{ tenisac.bodovi }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-pagination
        v-model="currentPage"
        :total-visible="5"
        :length="Math.ceil(filteredData.length / perPage)"
      ></v-pagination>
    </v-container>
  </v-sheet>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tenisaci: [],
      currentPage: 1,
      perPage: 15,
      searchText: '',
      searchType: 'nacionalnost',
      searchOptions: ['nacionalnost', 'ime'],
      showTable: false,
      filteredData: [],
    };
  },
  computed: {
    paginatedTenisaci() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredData.slice(start, end);
    },
  },
  mounted() {
    this.dohvatiTenisace();
  },
  methods: {
    dohvatiTenisace() {
      axios
        .get('https://sportscore1.p.rapidapi.com/tennis-rankings/atp', {
          params: { page: '1' },
          headers: {
            'X-RapidAPI-Key': '5beca7e0a7msh1d0046129924e2fp14ba9ejsn8e48bacb26b5',
            'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com',
          },
        })
        .then((response) => {
          this.tenisaci = response.data.data.map((tenisac) => ({
            ranking: tenisac.ranking,
            logo: tenisac.team.logo,
            imePrezime: this.invertNameOrder(tenisac.team.name_full),
            bodovi: tenisac.points,
            nacionalnost: tenisac.team.country,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    invertNameOrder(name) {
      const [ime, ...prezimeArr] = name.split(' ');
      const prezime = prezimeArr.join(' ');
      if (prezime && ime) {
        return `${prezime} ${ime.slice(0, -1)}`;
      } else if (ime) {
        return ime;
      } else if (prezime) {
        return prezime;
      } else {
        return '';
      }
    },
    pretrazi() {
      if (this.searchText && this.showTable) {
        const searchTerm = this.searchText.toLowerCase();
        if (this.searchType === 'nacionalnost') {
          this.filteredData = this.tenisaci.filter((tenisac) =>
            tenisac.nacionalnost.toLowerCase().includes(searchTerm)
          );
        } else if (this.searchType === 'ime') {
          this.filteredData = this.tenisaci.filter((tenisac) =>
            tenisac.imePrezime.toLowerCase().includes(searchTerm)
          );
        }
        this.currentPage = 1;
      } else {
        this.filteredData = this.tenisaci;
        this.currentPage = 1;
      }
      this.showTable = true;
    },
  },
};
</script>
