import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContactsStore = defineStore('contacts', () => {
  const currentCategory = ref(null)

  function setCurrentCategory(category) {
    currentCategory.value = category
  }

  return {
    currentCategory,
    setCurrentCategory
  }
})
