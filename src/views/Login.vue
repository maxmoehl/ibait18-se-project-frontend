<template>
  <div class="login">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  name: "Login",
  components: {LoginForm}
}
</script>

<style scoped>
.login {
  max-width: 600px;
  margin: auto;
}
</style>