<script setup lang="ts">
import { useData } from 'vitepress'
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  code: string
}>()

const { isDark } = useData()
const output = ref<HTMLElement | null>(null)
const loading = ref(true)
const failed = ref(false)

let renderCount = 0
const instanceId = Math.random().toString(36).slice(2)

async function renderDiagram() {
  const target = output.value
  if (!target) return

  loading.value = true
  failed.value = false

  try {
    const { default: mermaid } = await import('mermaid')
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: isDark.value ? 'dark' : 'default'
    })

    const id = `mermaid-${instanceId}-${renderCount++}`
    const { svg, bindFunctions } = await mermaid.render(id, decodeURIComponent(props.code))
    target.innerHTML = svg
    bindFunctions?.(target)
  } catch (error) {
    target.replaceChildren()
    failed.value = true
    console.error('Unable to render Mermaid diagram:', error)
  } finally {
    loading.value = false
  }
}

onMounted(renderDiagram)
watch(isDark, async () => {
  await nextTick()
  await renderDiagram()
})
</script>

<template>
  <div class="mermaid-diagram">
    <div ref="output" class="mermaid-diagram__output" role="img" aria-label="Diagram" />
    <p v-if="loading" class="mermaid-diagram__status">Rendering diagram...</p>
    <p v-else-if="failed" class="mermaid-diagram__status mermaid-diagram__status--error">
      This diagram could not be rendered.
    </p>
  </div>
</template>
