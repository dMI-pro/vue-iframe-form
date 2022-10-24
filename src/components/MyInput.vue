<template>
  <div class="item__inner">
    <label v-if="label">{{ label }}</label>
    <input
        class="form__input"
        :class=myClass
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
    />
  </div>
</template>

<script setup>
defineProps({
  myType: {
    type: [String],
    default: "",
  },
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
  myClass: {
    type: String,
    default: "",
  }

});
</script>

<style lang="scss" scoped>

.item__inner {
  display: flex;
  flex-direction: column;
}

.form__input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 6px 10px;
  font-size: 16px;
  box-sizing: border-box;
  border: 1px solid #304D91A8;
  border-radius: 4px;

  &:hover {
    border-color: #000;
  }

  &:focus {
    outline: 1px solid #10172CA8;
    box-shadow: 1px 1px 2px 0 #fff;
  }
}






</style>
