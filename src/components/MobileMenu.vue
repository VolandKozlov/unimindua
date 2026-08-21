<template>
  <Teleport to="body">
    <Transition name="menu-fade">
      <div v-if="open" class="mobile-menu-backdrop" @click.self="emit('close')">
        <div class="mobile-menu">
          <nav aria-label="Мобільна навігація">
            <a v-for="([label, href], index) in links" :key="href" :href="href" @click="emit('close')"><small>0{{ index + 1 }}</small>{{ label }}</a>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()
const links = [
  ['Про нас', '/#about'], ['Програми', '/#programs'], ['Навчання', '/#learning'],
  ['Спікери', '/#speakers'], ['Відгуки', '/#reviews'], ['Контакти', '/#contacts'],
]

defineProps<{ open: boolean }>()
</script>
