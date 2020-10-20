<template>
  <div class="app-container">

    <el-upload
      ref="upload"
      name="swiperUpload"
      class="upload-demo"
      action="http://192.168.90.100:54032/api/image/UploadSwiperImage"
      list-type="picture-card"
      :file-list="imageList"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      multiple
      :limit="4"
      :auto-upload="false"
    >
      <el-button size="mini" type="primary">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最多上传4个文件，</div>
      <div slot="tip" class="el-upload__tip">且每个文件不超过500kb</div>
    </el-upload>
    <el-button style="margin: 20px;" size="small" round type="success" @click="submitUpload">上传轮播图</el-button>
  </div>
</template>
<script>
import { GetSwiperImage, RemoveSwiperImage } from '@/api/image'
export default {
  data() {
    return {
      actionUrl: 'http://192.168.90.100:54032/api/image/UploadSwiperImage',
      imageList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      GetSwiperImage().then(res => {
        this.imageList = res.Data
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
      console.log('submitUpload')
      console.log(this.imageList)
    },
    handleRemove(file, fileList) {
      RemoveSwiperImage(file).then(res => {
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.fetchData()
      })
      console.log('handleRemove')
      console.log(this.imageList)
    },
    handleSuccess() {
      this.$notify({
        title: '上传成功',
        type: 'success',
        duration: 2000
      })
      this.fetchData()
    },
    handleError() {
      this.fetchData()
    }
  }
}
</script>
