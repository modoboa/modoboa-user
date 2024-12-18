<template>
  <v-col cols="6">
    <v-text-field
      v-model="email.address"
      :label="$gettext('Address')"
      variant="outlined"
      prepend-icon="mdi-email"
      density="compact"
      :rules="[rules.required]"
    />
  </v-col>
  <v-col cols="4" class="pl-4">
    <v-select
      v-model="email.type"
      :items="types"
      density="compact"
      variant="outlined"
      :rules="[rules.required]"
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
import rules from 'remote/form-rules'

const props = defineProps({
  email: Object,
  errors: Object,
  index: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['add', 'delete'])

const types = ['home', 'work', 'other']
</script>
