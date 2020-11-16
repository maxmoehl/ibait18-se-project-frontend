<template>
  <form novalidate>
    <md-card>
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>

      <md-card-content>
        <md-field>
          <label for="email">E-Mail</label>
          <md-input name="email" id="email" v-model="form.email"></md-input>
        </md-field>
        <md-field>
          <label for="password">Password</label>
          <md-input name="password" id="password" type="password" v-model="form.password"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button @click="login" class="md-primary">Anmelden</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginForm",
  data: function () {
    return {
      form: {
        email: null,
        password: null
      }
    };
  },
  beforeCreate() {
    this.$store.dispatch('updateLoginState');
    if (this.$store.state.loggedIn) {
      this.$router.push({name: 'admin'});
    }
  },
  methods: {
    login() {
      axios({
        url: `/api/login/?email=${this.form.email}&password=${this.form.password}`,
        method: 'get'
      }).then(res => {
        axios.defaults.headers.Authorization = `Bearer ${res.data.token}`;
        this.$store.dispatch('updateLoginState');
        this.$router.push({name: 'admin'});
      });
    }
  }
}
</script>

<style scoped>

</style>