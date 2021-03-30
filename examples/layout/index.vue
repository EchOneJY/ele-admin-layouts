<template>
  <eal-layout :routes="routes" class="app-container">
    <template v-slot:header-right>
      <div class="header-right">
        <div class="user">
          <span>欢迎您，admin</span>
        </div>
        <el-button size="mini" class="logout-btn" @click="logout" plain>注销</el-button>
      </div>
    </template>
  </eal-layout>
</template>

<script>
import EalLayout from '../../src/packages/layout'
export default {
  components: {
    EalLayout,
  },
  data() {
    return {}
  },
  computed: {
    routes() {
      return this.$store.getters.routes
    },
  },
}
</script>

<style lang="scss">
.app-container {
  .header-right {
    display: flex;
    align-items: center;
    .user {
      margin-left: 10px;
      font-size: 14px;
    }
    .logout-btn {
      height: 30px;
      margin-left: 16px;
    }
  }
}
</style>
