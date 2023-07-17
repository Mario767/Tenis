<template>
  <v-sheet>
    <v-container>
      <v-simple-table v-if="showTable">
        <template v-slot:default>
          <tbody>
            <tr>
              <td class="details-cell">
                <div class="tenisac-wrapper">
                  <img :src="paginatedTenisaci[0].logo" alt="Logo" height="100%" />
                  <div class="details">
                    <p><strong>Ime:</strong> {{ paginatedTenisaci[0].imePrezime }}</p>
                    <p><strong>Nacionalnost:</strong> {{ paginatedTenisaci[0].nacionalnost }}</p>
                    <p><strong>Bodovi:</strong> {{ paginatedTenisaci[0].bodovi }}</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-sheet>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tenisaci: [],
      showTable: false,
    };
  },
  computed: {
    paginatedTenisaci() {
      return this.tenisaci.slice(0, 1);
    },
  },
  mounted() {
    this.dohvatiTenisace();
  },
  methods: {
    dohvatiTenisace() {
      const rapidApiKey = '4b9d42bc87msh45fd852d944830dp15cadbjsn5edab88e39cc';
      const rapidApiHost = 'sportscore1.p.rapidapi.com';

      axios
        .get('https://sportscore1.p.rapidapi.com/tennis-rankings/atp', {
          params: { page: '1' },
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': rapidApiHost,
          },
        })
        .then((response) => {
          this.tenisaci = response.data.data.map((tenisac) => ({
            logo: tenisac.team.logo,
            imePrezime: this.invertNameOrder(tenisac.team.name_full),
            bodovi: tenisac.points,
            nacionalnost: tenisac.team.country,
          }));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.showTable = true;
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
  },
};
</script>

<style scoped>
/* Stiliziranje tablice */
.v-simple-table {
  width: 100%;
  border-collapse: collapse;
}

.v-simple-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #000000;
}

/* Stiliziranje slike */
.v-simple-table img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

/* Stiliziranje detalja */
.v-simple-table .details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

/* Centriranje tenisača s atributima */
.tenisac-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

/* Uklanjanje hover efekta */
.v-data-table tbody tr:hover:not(.header) {
  background-color: transparent !important;
}
</style>
