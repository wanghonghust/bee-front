<template>
  <div ref="xterm" class="xterm"/>
</template>
<script lang="ts" setup>
import '@xterm/xterm/css/xterm.css'
import {onBeforeUnmount, onMounted, ref} from "vue"
import {Terminal} from '@xterm/xterm'
import {FitAddon} from '@xterm/addon-fit'
import {AttachAddon} from '@xterm/addon-attach'

const xterm = ref(null)
const term = ref<Terminal>()
const socketURI = ref('ws://127.0.0.1:8080/ws/1')
const socket = ref<WebSocket>()
const initTerm = () => {
  const term1 = new Terminal({
    fontSize: 16,
    cursorBlink: true
  });
  const attachAddon = new AttachAddon(socket.value);
  const fitAddon = new FitAddon();
  term1.loadAddon(attachAddon);
  term1.loadAddon(fitAddon);
  if (xterm.value) {
    term1.open(xterm.value);
  }
  fitAddon.fit();
  term1.focus();
  term.value = term1
}

const initSocket = () => {
  socket.value = new WebSocket(socketURI.value);
  socketOnClose();
  socketOnOpen();
  socketOnError();
}
const socketOnOpen = () => {
  if (!socket.value) {
    return
  }
  socket.value.onopen = () => {
    // 链接成功后
    initTerm()
  }
}
const socketOnClose = () => {
  if (!socket.value) {
    return
  }
  socket.value.onclose = () => {
    // console.log('close socket')
  }
}

const socketOnError = () => {
  if (!socket.value) {
    return
  }
  socket.value.onerror = () => {
    // console.log('socket 链接失败')
  }
}

onMounted(() => {
  initSocket()
})
onBeforeUnmount(() => {
  socket.value && socket.value.close()
  term.value && term.value.dispose()
})

</script>
