<template>
  <div class="login">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";

/**
 * This view is for logging in to get access to the admin panel.
 */
export default {
  name: "Login",
  components: {LoginForm},
  /**
   * Before creating this component check if the user is logged in and if so redirect him to the admin panel.
   */
  beforeCreate() {
    this.$store.dispatch('updateLoginState').then(loggedIn => {
      if (loggedIn) {
        this.$router.push({name: 'admin'});
      }
    });
  }
}
</script>

<style scoped>
.login {
  max-width: 600px;
  margin: auto;
}
</style>