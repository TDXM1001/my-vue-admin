<template>
  <div class="engineering">
    <el-card class="box-card">
      <el-row class="table-grid-content">
        <el-col :span="15" class="grid" :gutter="10">
          <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
        </el-col>
        <el-col :span="2" class="grid" :gutter="10">
          <el-button type="success" icon="el-icon-search">搜索</el-button>
        </el-col>
        <el-col :span="2" class="grid" :gutter="10">
          <el-button type="primary" @click="addMembers()">增加</el-button>
        </el-col>
        <el-col :span="2" class="grid" :gutter="10">
          <el-button type="primary" @click="exportData()">导出</el-button>
        </el-col>
      </el-row>

      <el-table :data="tables" :stripe="true" :border="true" width="100%">
        <el-table-column label="日期" prop="date"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="modifyData(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" @click="deleteData(scope.$index,tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-input v-model="id" placeholder="请输入查询的ID号"></el-input>
    </el-card>

    <!-- 弹出层 -->
    <el-dialog :visible.sync="centerDialogVisible">
      <el-form :model="editForm">
        <el-form-item label="日期" :picker-options="pickerOptions">
          <el-date-picker
            v-model="editForm.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.name" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="sumbitEditRow()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isAddMembers">
      <el-form :model="addForm">
        <el-form-item label="日期" :picker-options="pickerOptions">
          <el-date-picker
            v-model="addForm.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="sumbitAddRow()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { musicBroadcastingDetails } from '@/api/index.js'
import axios from 'axios'
var _index
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      centerDialogVisible: false,
      isAddMembers: false,
      editForm: [],
      addForm: [],
      searchData: '',
      input: '',
      id: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      tableData: [
        {
          date: '2020-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2020-05-04',
          name: '王大虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2020-05-01',
          name: '王中虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2020-05-03',
          name: '王全虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '2020-05-04',
          name: '王大虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
      ],
    }
  },
  methods: {
    deleteData(index, row) {
      this.tableData.splice(index, 1)
      console.log('进行了删除操作')
      console.log('index的值是：' + index)
      console.log('row的值是：', row)
    },
    modifyData(index, row) {
      this.centerDialogVisible = true
      this.editForm = Object.assign({}, row) //重置对象
      _index = index
      console.log('index的值：' + index)
      console.log('_index的值：' + _index)
      console.log('row的值是：', this.editForm) //代表选择的这一行的数据
    },
    sumbitEditRow() {
      var editData = _index
      console.log('editData的值' + this.editForm)
      this.tableData[editData].name = this.editForm.name
      this.tableData[editData].date = this.editForm.date
      this.tableData[editData].address = this.editForm.address
      this.centerDialogVisible = false
      console.log('数据：' + this.editForm.date)
      console.log('对象数组', this.tableData)
    },
    closeDialog() {
      this.centerDialogVisible = false
      this.isAddMembers = false
      console.log('editfrom', this.editForm)
      console.log('addfrom', this.addForm)
    },
    addMembers() {
      this.isAddMembers = true
      this.addForm = {
        name: '',
        date: '',
        address: '',
      }
    },
    sumbitAddRow() {
      this.tableData = this.tableData || []
      console.log('表格是:' + this.tableData)
      this.tableData.push({
        name: this.addForm.name,
        date: this.addForm.date,
        address: this.addForm.address,
      })
      this.isAddMembers = false
      console.log('新增的日期：' + this.addForm.date)
    },
    // 导出数据
    exportData() {
      console.log('导出数据')
    },
  },
  computed: {
    tables() {
      const input = this.input
      if (input) {
        console.log('input输入的搜索内容：' + this.input)
        return this.tableData.filter((data) => {
          console.log('object:' + Object.keys(data))
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(input) > -1
          })
        })
      }
      return this.tableData
    },
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .box-card {
  padding: 30px;
} */
.table-grid-content {
  border-radius: 4px;
  height: 50 px;
  background: #ebeef5;
  padding: 10px;
}
</style>
