<template>
  <v-icon
      v-if="active"
      class="pa-1"
      icon="mdi-heart"
      color="indigo"
      @click="$emit('drop')"
  />
  <v-icon
      v-else
      class="pa-1"
      icon="mdi-heart"
      color="grey"
      @click="$emit('add')"
  />
</template>

<script lang="ts" setup>
defineProps({
  active: {
    type: Boolean,
  }
})
</script>