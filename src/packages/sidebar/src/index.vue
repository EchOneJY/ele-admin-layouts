<template>
  <div
    class="eal-sidebar"
    :class="{ collapse: isCollapse }"
    :style="{ width: sidebarWidth + 'px', flex: `0 0 ${sidebarWidth}px` }"
  >
    <div class="eal-logo" :class="{ collapse: isCollapse }" v-if="logoVisible && !$slots.logo" />
    <slot name="logo" v-if="logoVisible"></slot>
    <div class="sidebar-menu" :class="{ collapse: isCollapse, logo: logoVisible, tigger: collapse }">
      <el-scrollbar wrap-class="eal-scrollbar">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :default-active="activeMenu"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :active-text-color="variables.menuActiveText"
          :unique-opened="false"
          :collapse-transition="false"
          mode="vertical"
          router
        >
          <sidebar-item v-for="item in data" :key="item.path" :item="item" :base-path="item.path" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="collapse-bottom" v-if="collapse" @click="toggleCollapse">
      <i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i>
    </div>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import Variables from '../../../styles/var.scss'

export default {
  name: 'EalSidebar',
  props: {
    // 侧边栏数据
    data: {
      type: Array,
      default() {
        return []
      },
    },
    // 是否有收缩按钮
    collapse: {
      type: Boolean,
    },
    // 侧边栏收缩状态
    isCollapse: {
      type: Boolean,
    },
    // 是否展示logo
    logoVisible: {
      type: Boolean,
    },
    // 侧边栏宽度
    sidebarWidth: {
      type: Number,
    },
  },
  components: { SidebarItem },
  data() {
    return {}
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return Variables
    },
  },
  methods: {
    toggleCollapse() {
      this.$emit('update:is-collapse', !this.isCollapse)
    },
  },
}
</script>
