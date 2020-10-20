<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="菜品录入" name="first">
        <dishinput />
      </el-tab-pane>
      <el-tab-pane label="菜品修改" name="second">
        <dishedit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import dishinput from '../dish/dish_input'
import dishedit from '../dish/dish_edit'
export default {
  components: {
    dishinput,
    dishedit
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>
