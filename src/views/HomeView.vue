<template>
  <div class="home-page">
    <div class="background-image"></div>
    <div class="content">
      <h1 class="section-title">Prvi tenisač</h1>
      <div class="spacer"></div>
      <div class="tenisac-wrapper">
        <PrviTenisac />
      </div>
      <div class="spacer"></div>
      <h2 class="section-title">Grand Slamovi</h2>
      <v-carousel>
        <v-carousel-item v-for="slide in slides" :key="slide.id" :src="slide.imageUrl" @click="goToGrandSlamPage(slide.url)">
          <v-sheet class="caption">
            <h3 class="headline">{{ slide.title }}</h3>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <!-- Footer komponenta -->
      <v-footer class="footer">
        <div class="bg-teal d-flex align-center justify-center px-4">
          <strong>Social networks</strong>
          <v-spacer></v-spacer>
          <v-btn
            v-for="(icon, index) in icons"
            :key="icon"
            class="mx-2"
            icon
            variant="plain"
            size="small"
            @click="openSocialMedia(icon)"
            v-show="showIcon(index)"
          >
            <v-icon :class="getSocialIconClass(icon)" :color="getIconColor(icon)" style="font-size: 24px">{{ icon }}</v-icon>
          </v-btn>
        </div>
      </v-footer>
    </div>
  </div>
</template>

<script>
import PrviTenisac from '@/components/HomeComponent.vue';

export default {
  components: {
    PrviTenisac,
  },
  data() {
    return {
      slides: [
        {
          id: 1,
          title: 'Australian Open',
          imageUrl: 'https://ausopen.com/sites/default/files/styles/1600x/public/202306/29/mask-group-5.png?itok=AcIPExA8',
          url: 'https://www.australianopen.com/',
        },
        {
          id: 2,
          title: 'French Open',
          imageUrl: 'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2021-08/french-open-roland-garros-052721-getty-ftrjpeg_1a1pohw6620e0104pndk7zjj90.jpg?itok=xz5_Se2f',
          url: 'https://www.rolandgarros.com/',
        },
        {
          id: 3,
          title: 'Wimbledon',
          imageUrl: 'https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2021-08/wimbledon_1a0u4n76jhxky1qpmxuqozk3ul.jpg.webp?itok=0r_s97rq',
          url: 'https://www.wimbledon.com/',
        },
        {
          id: 4,
          title: 'US Open',
          imageUrl: 'https://photo-assets.usopen.org/images/pics/large/f_logo_NEW_20180319.jpg',
          url: 'https://www.usopen.org/',
        },
      ],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
        'mdi-youtube',
      ],
    };
  },
  methods: {
    goToGrandSlamPage(url) {
      window.open(url, '_blank');
    },
    openSocialMedia(icon) {
      if (icon === 'mdi-facebook') {
        window.open('https://www.facebook.com/ATPTour/', '_blank');
      } else if (icon === 'mdi-twitter') {
        window.open('https://twitter.com/atptour', '_blank');
      } else if (icon === 'mdi-instagram') {
        window.open('https://www.instagram.com/atptour/', '_blank');
      } else if (icon === 'mdi-youtube') {
        window.open('https://www.youtube.com/@ATPTour', '_blank');
      }
    },
    getSocialIconClass(icon) {
      return icon;
    },
    getIconColor(icon) {
      const whiteIcons = ['mdi-facebook', 'mdi-twitter', 'mdi-instagram', 'mdi-youtube'];
      if (whiteIcons.includes(icon)) {
        return 'white';
      }
      return 'white--text';
    },
    showIcon(index) {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return index < this.icons.length - 1; // Prikazuje samo jednu ikonu manje od ukupnog broja ikona na mobilnim uređajima
      }
      return true; // Prikazuje sve ikone na većim ekranima
    },
  },
};
</script>

<style scoped>
.home-page {
  position: relative;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background-image: url('https://wallpapers.com/images/hd/hd-tennis-background-1920-x-1200-8ro9y602hz9ng6j2.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.content {
  padding-top: 320px;
}

.section-title {
  text-align: center;
  font-size: 32px;
}

.tenisac-wrapper {
  position: relative;
  z-index: 1;
}

.spacer {
  height: 20px;
}

.footer {
  background-color: #00308F;
  color: white;
  padding: 16px;
  text-align: center;
  width: 100%;
}

.bg-teal {
  background-color: #00308F !important;
}

.px-4 {
  padding-left: 16px;
  padding-right: 16px;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.v-btn {
  min-width: auto;
}

.mx-2 {
  margin-left: 8px;
  margin-right: 8px;
}

/* Sakrivanje ikona na mobilnim uređajima */
@media (max-width: 600px) {
  .footer .mx-2:last-child {
    display: none;
  }
}
</style>
