<template>
  <v-col cols="6">
    <v-text-field
      v-model="phone.number"
      :label="$gettext('Phone number')"
      variant="outlined"
      prepend-icon="mdi-phone"
      density="compact"
    />
  </v-col>
  <v-col cols="4" class="pl-4">
    <v-select
      v-model="phone.type"
      :items="types"
      density="compact"
      variant="outlined"
      />
  </v-col>
  <v-col cols="2" class="pl-4">
    <v-btn
      icon="mdi-plus"
      @click="$emit('add')"
      size="x-small"
      flat
    />
    <v-btn
      v-if="index"
      icon="mdi-trash-can"
      @click="$emit('delete', index)"
      color="red"
      size="x-small"
      flat
      variant="text"
      />
  </v-col>
</template>

<script setup>
const props = defineProps({
  errors: Object,
  index: {
    type: Number,
    required: true
  },
  phone: Object
})
const emit = defineEmits(['add', 'delete'])

const types = ['cell', 'fax', 'home', 'main', 'pager', 'work', 'other']
</script>
