<template>
  <div class="empty">
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
    localStorage.removeItem('membershipSystemId')
    localStorage.removeItem('phone')
    localStorage.removeItem('membershipCardId')
    localStorage.removeItem('token')
    localStorage.removeItem('memberId')
  },
}
</script>
<style lang="scss">
</style>