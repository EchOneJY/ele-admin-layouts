<template>
  <div class="eal-header">
    <div class="eal-header-left">
      <i
        class="icon-fold"
        :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="toggleCollapse"
        v-if="visibleCollapse"
      ></i>
      <eal-breadcrumb class="eal-header-breadcrumb" :class="{ ml: visibleCollapse }" v-if="visibleBreadcrumb" />
      <slot name="left"></slot>
    </div>
    <div class="eal-header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import EalBreadcrumb from '../../breadcrumb'
export default {
  name: 'EalHeader',
  components: {
    EalBreadcrumb,
  },
  props: {
    visibleCollapse: {
      type: Boolean,
      default: true,
    },
    visibleBreadcrumb: {
      type: Boolean,
      default: true,
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleCollapse() {
      this.$emit('update:is-collapse', !this.isCollapse)
    },
  },
}
</script>
