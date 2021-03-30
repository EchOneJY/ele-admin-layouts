<template>
  <div class="eal-beradcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="index"
        :class="{ current: index === breadcrumbs.length - 1 }"
        >{{ item }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'EalBreadcrumb',
  data() {
    return {
      breadcrumbs: [],
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      this.breadcrumbs = this.$route.matched
        .filter(route => {
          return !!Object.keys(route.meta).length
        })
        .map(item => item.meta.title)
    },
  },
}
</script>
