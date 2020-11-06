<template>
  <div class="register">
    <registration-management :time-slot-id="timeSlotId"></registration-management>
    <registration-form></registration-form>
  </div>
</template>

<script>
import RegistrationForm from "@/components/RegistrationForm";
import RegistrationManagement from "@/components/RegistrationManagement";

export default {
  name: "Register",
  components: {RegistrationManagement, RegistrationForm},
  props: {
    timeSlotId: String
  }
}
</script>

<style scoped>

</style>