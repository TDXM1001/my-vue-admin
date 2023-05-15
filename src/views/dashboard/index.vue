<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
// 引入停车测试接口
import { getArrearsRecordList } from '@/api/parking'

import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
  },
  async created() {
    let obj = {
      pageIndex: 1,
      pageSize: 100,
      carplate: '川AW580K',
      iscache: 'notcache',
      appId: '000678201',
      comid: '200000053',
    }
    let data = await getArrearsRecordList(obj)
    console.log('返回的结果', data)
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
