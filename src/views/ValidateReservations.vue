<template>
  <div class="validation">
    <code-validation></code-validation>
  </div>
</template>

<script>
import CodeValidation from "@/components/CodeValidation";

export default {
  name: "ValidateReservations",
  components: {CodeValidation},
  /**
   * Before the component gets created we trigger a check whether or not the user is still logged in.
   * If not we re-route to the login page. Same goes for the admin and reservations view.
   * We also trigger a reload of the timeslot data in the background to make sure we display up to date data.
   */
  beforeCreate() {
    this.$store.dispatch('updateLoginState').then(loggedIn => {
      if (!loggedIn) {
        this.$router.push({name: 'login'});
      }
    });
  }
}
</script>

<style scoped>
.validation {
  max-width: 600px;
  margin: auto;
}
</style>