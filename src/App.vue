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

          <md-list-item class="navigation-link" @click="navTo('legal')">
            <md-icon>text_snippet</md-icon>
            <span class="md-list-item-text">Impressum</span>
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
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
/**
 * This is the main App component. It provides the base structure of our web app such as the top bar including
 * the menu button and the title as well as the menu itself since these components are the same throughout the whole
 * app. Every other view gets included in this component through the <router-view/> component.
 */
export default {
  /**
   * Before the app gets created we dispatch our init action to load all data and set up the shared state. We also
   * check the login state and if the user is not logged in but on a page that requires login we push the user
   * back to the login page.
   */
  beforeCreate() {
    this.$store.dispatch('init');
  },
  data() {
    return {
      /**
       * Whether or not to display the drawer containing the different menu urls.
       */
      showNavigation: false
    }
  },
  methods: {
    /**
     * Convenience method to navigate to any route without duplicating routes and close the navigation afterwards.
     * @param routeName
     */
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
