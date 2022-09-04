<template>
  <v-menu offset-y left nudge-bottom="14" min-width="230" content-class="user-profile-menu-content">
    <template v-slot:activator="{ on, attrs }">
      <v-badge bottom :color="api_status" overlap offset-x="12" offset-y="12" class="ms-4" dot>
        <v-avatar size="40px" v-bind="attrs" v-on="on">
          <v-icon size="25">
            {{ icons.mdiApi }}
          </v-icon>
        </v-avatar>
      </v-badge>
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <v-badge bottom :color="api_status" offset-x="6" offset-y="6" class="ms-4" dot>
          <v-icon size="25">
            {{ icons.mdiApi }}
          </v-icon>
        </v-badge>
        <div class="d-inline-flex flex-column justify-center ms-3" style="vertical-align: middle">
          <span class="text--primary font-weight-semibold mb-n1"> API Status </span>
          <small class="text--disabled">{{ api_message }}</small>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile -->
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title href="https://github.com/gael-gothuey" class="text-base">
            <v-btn color="secondary" small href="https://deals-api.gothuey.dev/">
              <v-icon size="22"> {{ icons.mdiConnection }} </v-icon><span class="ms-2">API Documentation</span></v-btn
            >
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mdiApi, mdiConnection } from '@mdi/js'
import DealBackendAPI from '@/utils/dealBackendService'

export default {
  data() {
    return {
      api_status: 'success',
      api_message: '',
    }
  },
  setup() {
    return {
      icons: {
        mdiApi,
        mdiConnection,
      },
    }
  },
  async mounted() {
    this.deal = new DealBackendAPI()
    this.getApiHealth()
  },
  methods: {
    getApiHealth() {
      this.deal.getApiHealth().then(response => {
        if (!response.success) {
          this.api_status = 'error'
          this.api_message = response.message
        }
        this.api_message = response.message
      })
    },
  },
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
