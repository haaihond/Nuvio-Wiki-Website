<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  platform: string
  label?: string
}>()

const platformClass = computed(() =>
  `platform-badge--${props.platform.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
)

const badgeLabel = computed(() => props.label || `${props.platform} only`)
</script>

<template>
  <span class="platform-badge" :class="platformClass">{{ badgeLabel }}</span>
</template>
