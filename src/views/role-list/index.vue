<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="small"
            v-permission="['distributePermission']"
            @click="onDistributePermissionClick(row)"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!--分配权限-->
    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    >
    </distribute-permission>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission.vue'
// 全部角色
const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
// 监听语言变化
watchSwitchLang(getRoleList)

// 点击分配权限按钮
const distributePermissionVisible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = (row) => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}

// 保证每次打开重新获取角色权限数据
watch(distributePermissionVisible, (val) => {
  if (!val) selectRoleId.value = ''
})
</script>
