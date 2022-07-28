<template>
  <div id="misc">
    <img
      class="misc-mask"
      height="226"
      :src="require(`@/assets/images/misc/misc-mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
    />

    <div class="page-title text-center px-5">
      <p class="text-4xl font-weight-semibold text--primary mb-2">Coming soon 🚀</p>
      <p class="mb-2">Work in progress...</p>
      <p class="text-sm">It will be possible to filter deals here</p>
      <v-btn icon class="ms-1"
        ><v-icon>{{ icons.mdiGithub }}</v-icon></v-btn
      >
      <div class="misc-character d-flex justify-center">
        <v-img max-width="350" src="@/assets/images/illustrations/soon.png"></v-img>
      </div>

      <v-btn color="primary" to="/" class="mb-4"> Back to home </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiGithub } from '@mdi/js'

export default {
  setup() {
    return {
      icons: {
        mdiGithub,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/misc.scss';
</style>
