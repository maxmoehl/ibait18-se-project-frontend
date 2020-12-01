<template>
  <div id="app">
    <md-app md-mode="fixed" :md-scrollbar="false">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title title" @click="navTo('home')">Corona Registrierung</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="showNavigation" md-swipable>
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item class="navigation-link" @click="navTo('home')">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Registrierung</span>
          </md-list-item>

          <md-list-item class="navigation-link" @click="navTo('faq')">
            <md-icon>help</md-icon>
            <span class="md-list-item-text">FAQ</span>
          </md-list-item>

          <md-list-item class="navigation-link" @click="navTo('privacy')">
            <md-icon>security</md-icon>
            <span class="md-list-item-text">Datenschutz</span>
          </md-list-item>

          <md-list-item v-if="$store.state.loggedIn" class="navigation-link" @click="navTo('admin')">
            <md-icon>admin_panel_settings</md-icon>
            <span class="md-list-item-text">Administration</span>
          </md-list-item>

          <md-list-item v-if="!$store.state.loggedIn" class="navigation-link" @click="navTo('login')">
            <md-icon>login</md-icon>
            <span class="md-list-item-text">Login</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('init');
  },
  data() {
    return {
      showNavigation: false
    }
  },
  methods: {
    navTo(routeName) {
      this.showNavigation = false;
      if (this.$route.name !== routeName) {
        this.$router.push({name: routeName});
      }
    }
  }
}
</script>

<style scoped>
.md-app {
  min-height: 100vh;
}

.title {
  cursor: pointer;
}

.navigation-link {
  cursor: pointer;
}

.md-drawer {
  width: 250px;
}
</style>
