<template>
  <div class="register">
    <registration-management :time-slot-id="timeSlotId"></registration-management>
  </div>
</template>

<script>
import RegistrationForm from "@/components/RegistrationForm";
import RegistrationManagement from "@/components/RegistrationManagement";

/**
 * In this view the user can enter the data of every guest he would like to add.
 */
export default {
  name: "Register",
  components: {RegistrationManagement, RegistrationForm},
  props: {
    timeSlotId: String
  }
}
</script>

<style scoped>
.register {
  max-width: 600px;
  margin: auto;
}
</style>