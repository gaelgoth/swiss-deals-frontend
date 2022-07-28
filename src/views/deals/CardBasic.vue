<template>
  <div>
    <!-- Digitec -->
    <v-row>
      <!-- Skeleton loading while the API response -->
      <v-col v-for="n in 3" v-bind:key="n" v-if="!digitec_loading" lg="4" sm="6" cols="12" class="align-self-start">
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader
      ></v-col>
      <v-col v-for="digitec in digitecs" :key="digitec.endpoint" lg="4" sm="6" cols="12" class="align-self-start">
        <!--Display alert for endpoint that fails-->
        <v-alert
          v-if="!digitec.success"
          :value="alert"
          dismissible
          transition="fade-transition"
          close-text="Close Alert"
          type="error"
          >Oops... {{ digitec.endpoint }}'s deal can't be loaded 🤧
        </v-alert>
        <!-- Display result from API -->
        <v-card v-else>
          <v-img :src="digitec.data.image_url" height="250" />
          <v-card-title>
            <p>
              {{ digitec.data.title }}

              <v-chip small color="dark" class="font-weight-medium">
                <v-icon size="20" color="error">
                  {{ icons.mdiChevronDown }}
                </v-icon>
                <span class="text-xxs error--text"
                  >-{{ (100 - (digitec.data.offer_price / digitec.data.regular_price) * 100).toFixed(0) }}%</span
                >
              </v-chip>
            </p>
          </v-card-title>
          <v-card-text class="text--primary text-base">
            <span class="font-weight-bold mb-0">{{ digitec.data.store }}</span>
            <v-spacer class="mb-2"></v-spacer>
            <div class="ms-1">
              <p class="text--secondary font-weight-light mb-1">
                Available stock : {{ ((digitec.data.remaining_stock / digitec.data.stock) * 100).toFixed(0) }}%
              </p>
              <v-progress-linear
                :value="((digitec.data.remaining_stock / digitec.data.stock) * 100).toFixed(0)"
                height="6"
                rounded
              ></v-progress-linear>
            </div>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <div class="me-auto pe-2">
              <p class="d-flex align-center mb-6">
                <v-icon color="primary">
                  {{ icons.mdiTrendingDown }}
                </v-icon>
                <span class="ms-3">Deal:</span
                ><span class="ms-2 font-weight-bold">{{ digitec.data.offer_price }} CHF</span>
              </p>
              <p class="d-flex align-center mb-0">
                <v-icon color="primary">
                  {{ icons.mdiStoreOutline }}
                </v-icon>
                <span class="ms-3">Price:</span
                ><span class="ms-2 font-weight-bold text-decoration-line-through"
                  >{{ digitec.data.regular_price }} CHF</span
                >
              </p>
            </div>
          </v-card-actions>
          <v-card-actions class="primary pa-0">
            <v-btn color="primary" block dark large :href="digitec.data.url" target="_blank"
              ><v-icon>{{ icons.mdiCartPlus }}</v-icon>
              <span class="ms-2">GO TO DEAL</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Skeleton loading while the API response -->
      <v-col v-for="n in 6" v-bind:key="n" v-if="!qoqa_loading" lg="4" sm="6" cols="12" class="align-self-start">
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader
      ></v-col>
      <!--Display API result-->
      <v-col v-for="qoqa in qoqas" :key="qoqa.endpoint" lg="4" sm="6" cols="12" class="align-self-start">
        <v-alert
          v-if="!qoqa.success"
          :value="alert"
          dismissible
          transition="fade-transition"
          close-text="Close Alert"
          type="error"
          >Oops... {{ qoqa.endpoint }}'s deal can't be loaded 🤧
        </v-alert>
        <v-card v-else>
          <v-img :src="qoqa.data.image_url" height="250" />
          <v-card-title>
            <p>
              {{ qoqa.data.title }}
            </p>
          </v-card-title>
          <v-card-text>
            {{ qoqa.data.subtitle }}
          </v-card-text>
          <v-card-text class="text--primary text-base">
            <span class="font-weight-bold mb-0">{{ qoqa.data.store }}</span>
            <v-spacer class="mb-2"></v-spacer>
            <div class="ms-1">
              <p class="text--secondary font-weight-light mb-1">Available stock : {{ qoqa.data.remaining_stock }}%</p>
              <v-progress-linear :value="qoqa.data.remaining_stock" height="6" rounded></v-progress-linear>
            </div>
          </v-card-text>
          <v-card-actions v-if="qoqa.data.offer_price" class="d-flex justify-center"> </v-card-actions>
          <v-card-actions v-if="qoqa.data.offer_price" class="d-flex justify-center">
            <div class="me-auto pe-2">
              <p class="d-flex align-center mb-6">
                <v-icon color="primary">
                  {{ icons.mdiTrendingDown }}
                </v-icon>
                <span class="ms-3">Deal:</span><span class="ms-2 font-weight-bold">{{ qoqa.data.offer_price }}</span>
              </p>
              <p v-if="qoqa.data.regular_price" class="d-flex align-center mb-0">
                <v-icon color="primary">
                  {{ icons.mdiStoreOutline }}
                </v-icon>
                <span class="ms-3">Price:</span
                ><span class="ms-2 font-weight-bold text-decoration-line-through">{{ qoqa.data.regular_price }}</span>
              </p>
            </div>
          </v-card-actions>
          <v-card-actions class="primary pa-0">
            <v-btn color="primary" block dark large :href="qoqa.data.url" target="_blank"
              ><v-icon>{{ icons.mdiCartPlus }}</v-icon>
              <span class="ms-2">GO TO DEAL</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  mdiChevronUp,
  mdiChevronDown,
  mdiCartPlus,
  mdiShareVariantOutline,
  mdiLockOpenOutline,
  mdiStarOutline,
  mdiAccountOutline,
  mdiTrendingUp,
  mdiTrendingDown,
  mdiHelpCircleOutline,
  mdiStoreOutline,
} from '@mdi/js'

import DealBackendAPI from '@/utils/dealBackendService'

export default {
  data() {
    return {
      digitecs: null,
      qoqas: null,
      success: false,
      error: false,
      digitec_loading: false,
      qoqa_loading: false,
      alert: true,
    }
  },
  setup() {
    const isCardDetailsVisible = false
    const rating = ref(5)

    return {
      isCardDetailsVisible,
      rating,

      // icons
      icons: {
        mdiChevronUp,
        mdiChevronDown,
        mdiCartPlus,
        mdiShareVariantOutline,
        mdiLockOpenOutline,
        mdiStarOutline,
        mdiAccountOutline,
        mdiTrendingUp,
        mdiTrendingDown,
        mdiHelpCircleOutline,
        mdiStoreOutline,
      },
    }
  },
  async mounted() {
    this.deal = new DealBackendAPI()
    this.getDigitec()
    this.getQoqa()
  },
  created() {
    setTimeout(() => {
      this.alert = false
    }, 10000)
  },
  methods: {
    getDigitec() {
      ;(this.digtec_loading = false),
        this.deal
          .getDigitec()
          .then(response => {
            this.resetQoqaLoading()
            this.digitecs = response
            this.digitec_loading = true
          })
          .catch(error => {
            this.error = true
            console.log(error)
          })
    },

    computeStock(remaining_stock, stock) {
      return (remaining_stock / stock) * 100
    },

    getQoqa() {
      ;(this.qoqa_loading = false),
        this.deal
          .getQoqa()
          .then(response => {
            this.resetQoqaLoading()
            this.qoqas = response
            this.qoqa_loading = true

            // this.qoqa_stock_percent = this.computeStock(this.digitec.remaining_stock, this.digitec.stock)
          })
          .catch(error => {
            this.error = true
            console.log(error)
          })
    },

    //TODO: Remove this and use response from API
    resetQoqaLoading() {
      this.success = false
      this.error = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/plugins/vuetify/default-preset/preset/mixins.scss';

.avatar-center {
  top: -2rem;
  left: 1rem;
  border: 3px solid white;
  position: absolute;
}

// membership pricing
@include theme--child(memberpricing-bg) using ($material) {
  background-color: rgba(map-deep-get($material, 'primary-shade'), map-deep-get($material, 'states', 'hover'));
}

.memberpricing-bg {
  position: relative;
}
.membership-pricing {
  text-align: center;
  sup {
    font-size: 3.75rem;
    top: 9px;
  }
}
</style>
