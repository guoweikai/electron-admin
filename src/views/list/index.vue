<template>
  <vab-query-form>
    <vab-query-form-left-panel>
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加</el-button>
    </vab-query-form-left-panel>
  </vab-query-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="user_id" label="用户标识" width="180" />
    <el-table-column prop="device_id" label="设备Id" width="180" />
    <el-table-column prop="device_name" label="设备名称" />
    <el-table-column prop="auth_code" label="卡密" width="300" />
    <el-table-column show-overflow-tooltip label="二维码" width="300">
      <template #default="{ row }">
        <qrcode-vue :value="row.auth_code" :size="200" level="H" />
      </template>
    </el-table-column>
    <el-table-column prop="create_time" label="生成时间" width="150" />
    <el-table-column prop="days" label="总天数" />
    <el-table-column prop="remaining_days" label="剩余天数" />
    <el-table-column prop="packages" label="包名称" width="300px">
      <template #default="{ row }">
        {{ row.packages }}
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip label="操作" width="180px" fixed="center">
      <template #default="{ row }">
        <el-button type="text" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <table-edit ref="edit" @fetch-data="fetchData"></table-edit>
</template>

<script>
import VabQueryFormLeftPanel from './VabQueryFormLeftPanel.vue'
import VabQueryForm from './VabQueryForm.vue'
import TableEdit from './/TableEdit.vue'
import { kamiList } from '@/api/kami.ts'
import QrcodeVue from 'qrcode.vue'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },
  components: {
    VabQueryFormLeftPanel,
    VabQueryForm,
    TableEdit,
    QrcodeVue
  },
  methods: {
    handleDelete() {},
    async fetchData() {
      const data = await kamiList()
      this.tableData = data.data.list
    },
    handleAdd() {
      console.log('xixi')
      this.$refs['edit'].showEdit()
    },
    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
    }
  }
}
</script>
