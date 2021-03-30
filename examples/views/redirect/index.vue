<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path, name } = params
    if (path) {
      this.$router.replace({ path: '/' + path, query })
    } else if (name) {
      this.$router.replace({ name, query })
    }
  },
  render: function (h) {
    return h() // avoid warning message
  },
}
</script>
