<template>
  <div class="eal-tabs">
    <el-tabs v-model="tabValue" type="card" @tab-remove="handleTabRemove" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :closable="!isAffix(item)"
        :label="item.title"
        :name="item.path"
      ></el-tab-pane>
    </el-tabs>
    <ul class="tabs-extra">
      <el-tooltip class="item" effect="dark" content="刷新" placement="bottom" :open-delay="500">
        <li class="refresh" @click="handleRefresh" v-if="visibleRefresh">
          <i class="el-icon el-icon-refresh refresh"></i>
        </li>
      </el-tooltip>

      <el-dropdown @command="handleCommand">
        <li>
          <i class="el-icon el-icon-arrow-down"></i>
        </li>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-close" :disabled="onlnAffix" command="current">关闭标签页</el-dropdown-item>
          <el-dropdown-item icon="el-icon-files" :disabled="closeOtherState" command="other"
            >关闭其他标签页</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-d-arrow-left" :disabled="curTabIndex === 0" command="left"
            >关闭左侧标签页</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-d-arrow-right" :disabled="curTabIndex === tabList.length - 1" command="right"
            >关闭右侧标签页</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-minus" :disabled="onlnAffix" command="all">关闭全部标签页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <li class="full-screen" @click="toggleFull" v-if="visibleFull">
        <!-- <svg-icon :icon-class="full ? 'close-full' : 'full'"></svg-icon> -->
        <i class="el-icon el-icon-full-screen"></i>
      </li>
      <slot name="extra"></slot>
    </ul>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'EalTabsView',
  props: {
    //页签数据
    tabsData: {
      type: Array,
      default() {
        return []
      },
    },
    //是否展示刷新
    visibleRefresh: {
      type: Boolean,
    },
    //是否展示内容全屏
    visibleFull: {
      type: Boolean,
    },
    //内容全屏展示状态
    isContentFull: {
      type: Boolean,
    },
  },
  data() {
    return {
      tabValue: '/',
      tabList: [],
      affixTabs: [],
    }
  },
  computed: {
    onlnAffix() {
      if (this.tabList.findIndex(item => !item.meta.affix) > -1) {
        return false
      }
      return true
    },
    closeOtherState() {
      return this.tabList.length <= 1
    },
    curTabIndex() {
      return this.tabList.findIndex(tab => tab.path === this.tabValue)
    },
  },
  mounted() {
    this.initTabs()
    this.addTabs()
  },
  watch: {
    $route() {
      this.tabValue = this.$route.path || '/'
      this.onAddTab(this.$route)
    },
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tab) {
      return tab.meta && tab.meta.affix
    },
    filterAffixTabs(data, basePath = '/') {
      let tabs = []
      data.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tabs.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTabs(route.children, route.path)
          if (tempTags.length >= 1) {
            tabs = [...tabs, ...tempTags]
          }
        }
      })
      return tabs
    },
    initTabs() {
      const affixTabs = (this.affixTabs = this.filterAffixTabs(this.tabsData))
      for (const tab of affixTabs) {
        if (tab.name) {
          this.onAddTab(tab)
        }
      }
    },
    addTabs() {
      this.tabValue = this.$route.path
      this.onAddTab(this.$route)
    },
    onAddTab(tab) {
      if (this.tabList.some(v => v.path === tab.path)) return
      this.tabList.push(
        Object.assign({}, tab, {
          title: tab.meta.title || 'no-name',
        }),
      )
    },
    handleTabRemove(targetName) {
      this.tabList = this.tabList.filter(tab => tab.path !== targetName)
      this.toLastTab()
    },
    handleTabClick(tab) {
      const { name } = tab
      const route = this.tabList.find(tab => tab.path === name)
      const { path, query, params } = route
      this.$router.push({ path, query, params })
    },
    handleCommand(cmd) {
      switch (cmd) {
        case 'current':
          this.handleTabRemove(this.tabValue)
          break
        case 'other':
          this.tabList = this.tabList.filter(tab => tab.path === this.tabValue || (tab.meta && tab.meta.affix))
          break
        case 'left':
          this.tabList = this.tabList.filter((tab, i) => i >= this.curTabIndex || tab.meta?.affix)
          break
        case 'right':
          this.tabList = this.tabList.filter((tab, i) => i <= this.curTabIndex || tab.meta?.affix)
          break
        case 'all':
          this.tabList = this.tabList.filter(tab => tab.meta && tab.meta.affix)
          this.toLastTab()
          break
      }
    },
    toLastTab() {
      const tab = this.tabList.slice(-1)[0]
      if (tab) {
        this.$router.push(tab.fullPath)
      } else {
        this.$router.push('/')
      }
    },
    handleRefresh() {
      const tab = this.tabList.find(tab => tab.path === this.tabValue)
      const path = '/redirect' + tab?.path || this.tabValue
      const query = tab?.query
      const params = tab?.params
      this.$router.push({
        path,
        query,
        params,
      })
    },
    toggleFull() {
      this.$emit('update:isContentFull', !this.isContentFull)
    },
  },
}
</script>
