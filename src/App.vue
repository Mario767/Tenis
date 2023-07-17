<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item v-for="(link, index) in links" :key="index" :to="link.ruta" link>
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.ime }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#ffffff" flat class="white--text elevation-2" style="border-bottom: 1px solid #a09898;" v-if="!isMobile">
      <v-toolbar-title>{{ naslov }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs centered>
        <v-tab v-for="(link, index) in links" :key="index" :to="link.ruta" :exact="link.exact">
          <v-icon>{{ link.icon }}</v-icon>
          <span>{{ link.ime }}</span>
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-app-bar app color="#ffffff" flat class="white--text elevation-2" style="border-bottom: 1px solid #a09898;" v-else>
      <v-toolbar-title>{{ naslov }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>{{ drawerIcon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-sheet min-height="100vh" rounded="lg">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 white--text text-center">
          <!-- Footer content -->
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      naslov: 'Tenis',
      links: [
        { ime: 'Home', ruta: '/', icon: 'mdi-home', exact: true },
        { ime: 'Live', ruta: '/live', icon: 'mdi-play-circle-outline' },
        { ime: 'Tenisaci', ruta: '/tenisaci', icon: 'mdi-account' },
        { ime: 'About', ruta: '/about', icon: 'mdi-information' },
      ],
      drawer: false,
      isMobile: false,
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 1024;
    },
  },
  computed: {
    drawerIcon() {
      return this.drawer ? 'mdi-chevron-left' : 'mdi-menu';
    },
  },
};
</script>

<style>
.v-footer {
  background-color: #424242;
  color: white;
}
</style>
