<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="套餐录入" name="first">
        <packageinput />
      </el-tab-pane>
      <el-tab-pane label="套餐修改" name="second">
        <packageedit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import packageedit from '../package/package_edit'
import packageinput from '../package/package_input'
export default {
  components: {
    packageedit,
    packageinput
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>
