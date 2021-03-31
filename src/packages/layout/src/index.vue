<template>
  <div class="eal-layout">
    <!-- Sidebar -->
    <eal-sidebar
      :data="routes"
      :visible-fold="visibleCollapseSideBar"
      :visible-logo="visibleLogo"
      :sidebar-width="sidebarWidth"
      :is-fold.sync="isCollapse"
      v-if="!isContentFull"
    >
      <slot name="logo" slot="logo"></slot>
    </eal-sidebar>

    <div class="eal-layout-right">
      <div class="eal-layout-right-header">
        <!-- Header -->
        <eal-header
          :visible-fold="visibleCollapseHeader"
          :is-fold.sync="isCollapse"
          :visible-breadcrumb="visibleBreadcrumb"
          v-if="!isContentFull"
        >
          <slot name="header-left" slot="left"></slot>
          <slot name="header-right" slot="right"></slot>
        </eal-header>

        <!-- Tabs -->
        <eal-tabs-view
          :tabs-data="routes"
          :visible-refresh="visibleRefresh"
          :visible-full="visibleFull"
          :is-content-full.sync="isContentFull"
          v-if="visibleTabs"
        />
      </div>

      <div class="eal-layout-content">
        <router-view></router-view>
      </div>
    </div>

    <slot name="settings"></slot>
  </div>
</template>

<script>
import EalSidebar from '../../sidebar'
import EalHeader from '../../header'
import EalTabsView from '../../tabs-view'

export default {
  name: 'EalLayout',
  props: {
    //是否展示侧边栏logo
    visibleLogo: {
      type: Boolean,
      default: true,
    },
    // 侧边栏宽度
    sidebarWidth: {
      type: Number,
      default: 220,
    },
    // 侧边栏及页签数据（公用路由数据）
    routes: {
      type: Array,
      default() {
        return []
      },
    },
    //是否展示侧边栏伸缩按钮
    visibleCollapseSideBar: {
      type: Boolean,
      default: false,
    },
    //是否展示Header伸缩按钮
    visibleCollapseHeader: {
      type: Boolean,
      default: true,
    },
    //是否展示Header面包屑
    visibleBreadcrumb: {
      type: Boolean,
      default: true,
    },
    // 是否展示页签
    visibleTabs: {
      type: Boolean,
      default: true,
    },
    //是否展示刷新
    visibleRefresh: {
      type: Boolean,
      default: true,
    },
    //是否展示内容全屏
    visibleFull: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    EalSidebar,
    EalHeader,
    EalTabsView,
  },
  data() {
    return {
      isCollapse: false, //侧边栏是否伸缩
      isContentFull: false, //内容是否全屏展示
    }
  },
}
</script>
