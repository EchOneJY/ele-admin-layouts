<template>
  <div class="eal-header">
    <div class="eal-header-left">
      <i
        class="icon-fold"
        :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="toggleCollapse"
        v-if="collapse"
      ></i>
      <sl-breadcrumb class="eal-header-breadcrumb" :class="{ ml: collapse }" v-if="breadcrumb" />
      <slot name="left"></slot>
    </div>
    <div class="eal-header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import SlBreadcrumb from '../../breadcrumb'
export default {
  name: 'EalHeader',
  components: {
    SlBreadcrumb,
  },
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
    breadcrumb: {
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
