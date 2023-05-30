<template>
  <el-card
    class="container"
    :body-style="{
      padding: 0
    }"
  >
    <el-calendar class="calendar" v-model="currentDate">
      <template #data-cell="{ data }">
        <p
          :class="[
            data.isSelected ? 'is-selected' : '',
            calendarItemBgClass(data.day)
          ]"
        >
          <!-- 显示的内容 -->
          {{ data.day.split('-').slice(2).join('') }}
          <br />
          <!--当日金额-->
          <span class="amount" v-if="getTadayAmount(data.day)">
            {{ getTadayAmount(data.day) }}
          </span>
        </p>
      </template>
    </el-calendar>
  </el-card>
</template>

<script setup>
import { getChartCalendar } from '@/api/chart'
import emitter from '@/utils/eventHub'
import { watch, ref } from 'vue'

// 选中的日期
const currentDate = ref(new Date())

watch(currentDate, (val) => {
  emitter.emit('calendarChange', val)
})

// 获取数据
const calendarListData = ref([])
const getCalendarListData = async () => {
  const { result } = await getChartCalendar()
  calendarListData.value = result
}

const dataAmountList = ref({})
// 返回指定日期收益数据，在日历中进行展示
const getTadayAmount = (date) => {
  // 读取缓存数据
  if (dataAmountList.value[date]) {
    return dataAmountList.value[date]
  }
  const tadayData = calendarListData.value.find((item) => (item.data = date))
  if (!tadayData) {
    return 0
  }
  // 获取当日收益
  const tadayAmount = tadayData.amount
  // 对数据进行缓存
  dataAmountList.value[date] = tadayAmount

  return tadayAmount
}

/**
 * 返回日历的背景
 * */
const calendarItemBgClass = (day) => {
  if (getTadayAmount(day) > 0) {
    return 'profit'
  } else if (getTadayAmount(day) < 0) {
    return 'loss'
  }
  return ''
}

getCalendarListData()
</script>

<style lang="scss" scoped>
.container {
  height: 443px;
  .calendar {
    ::v-deep(.el-calendar__body) {
      padding: 0 12px 12px;
      font-size: 14px;
    }
    ::v-deep(.el-calendar-day) {
      height: 66px !important;
      padding: 0 !important;
      p {
        height: 100%;
        padding: 8px;
      }
      // 金额样式
      .amount {
        font-size: 12px;
      }
      // 正收益
      .profit {
        background-color: #f3fff3;
        span {
          color: #649840;
        }
      }
      // 负收益
      .loss {
        background-color: #ffe7e7;
        span {
          color: #b65d59;
        }
      }

      .is-selected {
        background-color: #d6f2ff;
      }
    }
  }
}
</style>
