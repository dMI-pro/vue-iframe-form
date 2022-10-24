<template>
  <div class="form__item">
    <div
        v-if="errors[0]"
        class='form__errors'>
        <span
            v-for="error in errors"
            :key="error.$uid"
            class="form__errors-txt"
        >
          {{ error.$message }}

        </span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  errors: Array,
  default: [],
})

</script>

<style scoped>

</style>
