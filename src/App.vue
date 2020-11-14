<template>
  <div id="app">
    <md-app md-mode="fixed" :md-scrollbar="false">
      <md-app-toolbar class="md-primary">
        <span class="md-title">Corona Registrierung</span>
      </md-app-toolbar>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('loadTimeSlots');
  }
}
</script>

<style scoped>

</style>
