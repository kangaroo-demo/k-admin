import getDynamicData from './DynamicData'
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

export const dynamicData = ref(getDynamicData())

watchSwitchLang(() => {
  dynamicData.value = getDynamicData()
  initSelectDynamicLabel()
})

// 初始化选中的 Label（默认全选）
export const selectDynamicLabel = ref([])
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()

// 声明 table 的列数据
export const tableColumns = ref([])

watch(
  selectDynamicLabel,
  (val) => {
    tableColumns.value = []
    // 遍历选中项
    const selectData = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selectData)
  },
  { immediate: true }
)
