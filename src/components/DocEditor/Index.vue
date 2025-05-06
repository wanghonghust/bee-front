<template>
  <div>
    <editor v-model="content" :init="init" :id="tinymceId">
      <form><button name="submitbtn"></button></form>
    </editor>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import tinymce from "tinymce/tinymce";
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default';
import 'tinymce/models/dom'
// 插件引入
import "tinymce/plugins/advlist"
import "tinymce/plugins/anchor"
import "tinymce/plugins/autolink"
import "tinymce/plugins/autoresize"
import "tinymce/plugins/autosave"
import "tinymce/plugins/charmap"
import "tinymce/plugins/code"
import "tinymce/plugins/codesample"
import "tinymce/plugins/directionality"
import "tinymce/plugins/emoticons"
import "tinymce/plugins/emoticons/js/emojis"
import "tinymce/plugins/fullscreen"
import "tinymce/plugins/help"
import "tinymce/plugins/image"
import "tinymce/plugins/importcss"
import "tinymce/plugins/insertdatetime"
import "tinymce/plugins/link"
import "tinymce/plugins/lists"
import "tinymce/plugins/media"
import "tinymce/plugins/nonbreaking"
import "tinymce/plugins/pagebreak"
import "tinymce/plugins/preview"
import "tinymce/plugins/save"
import "tinymce/plugins/searchreplace"
import "tinymce/plugins/table"
import "tinymce/plugins/template"
import "tinymce/plugins/visualblocks"
import "tinymce/plugins/visualchars"
import "tinymce/plugins/wordcount"
import "tinymce-plugin/plugins/bdmap";
import axios from "axios";
import {NavigationGuardNext, onBeforeRouteLeave, onBeforeRouteUpdate, RouteLocationNormalized} from "vue-router";

const tinymceId = ref("vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""))
const props = defineProps({
  content: {
    type: String,
    default: ""
  }
})
const init = reactive({
  seletor: "#" + tinymceId.value,
  language_url: "/tinymce/langs/zh-Hans.js",
  language: "zh-Hans", //语言
  skin_url: "/tinymce/skins/ui/oxide",
  height: 750, //编辑器高度
  branding: false, //是否禁用“Powered by TinyMCE”
  menubar: true,
  image_dimensions: false,
  plugins: 'bdmap advlist anchor autolink autosave charmap code codesample directionality emoticons fullscreen image importcss insertdatetime link lists media nonbreaking pagebreak preview save searchreplace table template visualblocks visualchars wordcount help',
  toolbar: 'bdmap save undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags code | align lineheight |  numlist bullist indent outdent | emoticons charmap | removeformat insertdatetime fullscreen ',
  font_formats: 'Arial=arial,helvetica,sans-serif; 宋体=SimSun; 微软雅黑=Microsoft Yahei; Impact=impact,chicago;',
  fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px',
  paste_webkit_styles: "all",
  paste_merge_formats: true,
  autosave_ask_before_unload: false,
  nonbreaking_force_tab: false,
  paste_auto_cleanup_on_paste: false,
  file_picker_types: 'file',
  content_css: '/tinymce/skins/content/document/content.css',

  //图片上传
  images_upload_handler: (blobInfo: any, progress: any) => new Promise((resolve, reject) => {

    if (blobInfo.blob().size / 1024 / 1024 > 2) {
      reject({message: '上传失败，图片大小请控制在 2M 以内', remove: true})
      return
    } else {
      const ph = import.meta.env.VITE_BASE_PATH + ":" + import.meta.env.VITE_SERVER_PORT + "/"
      let params = new FormData()
      params.append('file', blobInfo.blob())

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",

        }
      }

      axios.post('xxxx', params, config).then(res => {
        if (res.data.code == 200) {
          resolve(ph + res.data.msg)  //上传成功，在成功函数里填入图片路径
        } else {
          reject('HTTP Error: 上传失败' + res.data.code);
          return
        }
      }).catch(() => {
        reject('上传出错，服务器开小差了呢')
        return
      })
    }
  }),
  // 文件上传
  file_picker_callback: (callback: any, value: any, meta: any) => {
    // Provide file and text for the link dialog
    if (meta.filetype == 'file') {
      callback('mypage.html', {text: 'My text'});
    }

    // Provide image and alt text for the image dialog
    if (meta.filetype == 'image') {
      callback('myimage.jpg', {alt: 'My alt text'});
    }

    // Provide alternative source and posted for the media dialog
    if (meta.filetype == 'media') {
      callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
    }
  }
})
const confirmLeaveOrUpdate = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (props.content.length > 0) {
    const res = confirm('你所做的更改可能未保存。')
    if (res) {
      next(true)
      window.removeEventListener('beforeunload', al)
      return
    } else {
      next(false)
    }
  } else {
    next(true)
    window.removeEventListener('beforeunload', al)
  }
}

const al = (event: any) => {
  if (event) {
    event.returnValue = "...";
  }
  return "..."
}
onMounted(() => {
  tinymce.init({})
  window.addEventListener('beforeunload', al)
})
onBeforeRouteLeave(confirmLeaveOrUpdate)

</script>


<style scoped>
@import 'tinymce/skins/content/document/content.css';
</style>