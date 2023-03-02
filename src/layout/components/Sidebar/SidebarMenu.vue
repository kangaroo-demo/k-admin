<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    router
    :collapse="!$store.getters.sidebarOpened"
    :uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item">
    </sidebar-item>
  </el-menu>
</template>

<script setup>
import sidebarItem from './SidebarItem.vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import { computed } from 'vue'

const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRouters(router.getRoutes())
  return generateMenus(fRoutes)
})

// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
