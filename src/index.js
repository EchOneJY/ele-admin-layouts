import Breadcrumb from './packages/breadcrumb/index.js'
import Header from './packages/header/index.js'
import Sidebar from './packages/sidebar/index.js'
import TabsView from './packages/tabs-view/index.js'
import Layout from './packages/layout/index'

const components = [Breadcrumb, Header, Sidebar, TabsView, Layout]

const install = function (Vue) {
  if (install.installed) return

  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Breadcrumb,
  Header,
  Sidebar,
  TabsView,
  Layout,
}
