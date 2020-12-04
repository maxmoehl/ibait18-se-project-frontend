<template>
  <form novalidate>
    <md-card>
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>

      <md-card-content>
        <md-field>
          <label for="email">E-Mail</label>
          <md-input name="email" id="email" v-model="form.email" autocomplete="email"/>
        </md-field>
        <md-field>
          <label for="password">Passwort</label>
          <md-input name="password" id="password" type="password" v-model="form.password" autocomplete="current-password"/>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="login" class="md-primary">Anmelden</md-button>
      </md-card-actions>
    </md-card>

    <md-dialog :md-active.sync="wrongPasswordDialog">
      <md-dialog-title>
        Falsche Logindaten!
      </md-dialog-title>
      <md-dialog-content>
        Ihre E-Mail Adresse oder Ihr Passwort ist falsch. Bitte versuchen Sie es erneut.
      </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="wrongPasswordDialog = false">
          Schließen
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </form>
</template>

<script>
/**
 * A simple login form for the user to log in.
 */
export default {
  name: "LoginForm",
  data: function () {
    return {
      form: {
        email: null,
        password: null
      },
      wrongPasswordDialog: false
    };
  },
  methods: {
    /**
     * Dispatches an event to the store to login and reacts to the result by either sending the user to the admin panel
     * or informing the user that he couldn't be logged in.
     */
    login() {
      this.$store.dispatch('login', {email: this.form.email, password: this.form.password}).then(() => {
        this.$router.push({name: 'admin'});
      }, reason => {
        this.wrongPasswordDialog = true;
        this.form.email = null;
        this.form.password = null;
        // TODO see if other errors are possible and act accordingly
        console.error(reason.response.data);
      });
    }
  }
}
</script>

<style scoped>

</style>