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
        <md-button @click="login()" class="md-primary">Anmelden</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
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
  methods: {
    login() {

    }
  }
}
</script>

<style scoped>
form {
  max-width: 500px;
  margin: auto;
}
</style>