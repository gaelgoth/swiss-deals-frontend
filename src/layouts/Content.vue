<template>
  <v-app>
    <vertical-nav-menu :is-drawer-open.sync="isDrawerOpen"></vertical-nav-menu>

    <v-app-bar app flat absolute color="transparent">
      <div class="boxed-container w-full">
        <div class="d-flex align-center mx-3">
          <!-- Left Content -->
          <v-app-bar-nav-icon class="d-block d-lg-none me-2" @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
          <h2>{{ message }}👋</h2>
          <v-spacer></v-spacer>

          <!-- Right Content -->
          <a href="https://github.com/gaelgoth/swiss-deals-frontend" target="_blank" rel="nofollow">
            <v-icon class="ms-6 me-4">
              {{ icons.mdiGithub }}
            </v-icon>
          </a>
          <theme-switcher></theme-switcher>
          <app-bar-user-menu></app-bar-user-menu>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <div class="app-content-container boxed-container pa-6">
        <slot></slot>
      </div>
    </v-main>

    <v-footer app inset color="transparent" absolute height="56" class="px-0">
      <div class="boxed-container w-full">
        <div class="mx-6 d-flex justify-space-between">
          <span>
            &copy; 2022
            <a href="https://deals.gothuey.dev" class="text-decoration-none" target="_blank">Swiss Deals</a></span
          >
          <span class="d-sm-inline d-none">
            <a href="https://blog.gothuey.dev/" target="_blank" class="me-6 text--secondary text-decoration-none"
              >Blog</a
            >
            <a href="https://github.com/gaelgoth" target="_blank" class="text--secondary text-decoration-none"
              >Made with 💖 By Gaël G.</a
            >
          </span>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>
<script>
import { ref } from '@vue/composition-api'
import { mdiMagnify, mdiBellOutline, mdiGithub } from '@mdi/js'
import VerticalNavMenu from './components/vertical-nav-menu/VerticalNavMenu.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import AppBarUserMenu from './components/AppBarApiStatus.vue'
import greetings from '@akp-13/greetings'
import DealBackendAPI from '@/utils/dealBackendService'
export default {
  components: {
    VerticalNavMenu,
    ThemeSwitcher,
    AppBarUserMenu,
  },
  async mounted() {
    this.deal = new DealBackendAPI()
    this.getApiHealth()
  },
  setup() {
    const isDrawerOpen = ref(null)

    return {
      isDrawerOpen,

      // Icons
      icons: {
        mdiMagnify,
        mdiBellOutline,
        mdiGithub,
      },
    }
  },
  methods: {
    getApiHealth() {
      this.deal.getApiHealth().then(response => {
        if (!response.success) {
          this.api_health_status = false
        }
      })
    },
  },
  data() {
    return {
      message: greetings.greetRandom(),
      api_health_status: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.boxed-container {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}
</style>
