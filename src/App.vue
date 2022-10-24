<template>
  <transition-group>
    <form class="form" @submit.prevent="submitFrom">
      <FormItem :errors=v$.firstName.$errors>
        <MyInput
            v-model="formData.firstName"
            :myClass="v$.firstName.$errors[0] ? 'form__input-error' : '' "
            name="firstName"
            type="text"
            placeholder="First Name"
        />
      </FormItem>

      <FormItem :errors=v$.lastName.$errors>
        <MyInput
            v-model="formData.lastName"
            :myClass="v$.lastName.$errors[0] ? 'form__input-error' : '' "
            name="lastName"
            type="text"
            placeholder="Last Name"
        />
      </FormItem>

      <FormItem :errors=v$.email.$errors>
        <MyInput
            v-model="formData.email"
            :myClass="v$.email.$errors[0] ? ' form__input-error' : '' "
            name="email"
            type="email"
            placeholder="Email Address"
        />
      </FormItem>


      <FormItem :errors=phoneValid>
       <vue-tel-input
           v-if="userCountryCode"
           :defaultCountry="userCountryCode"
           :class="phoneValid[0] ? ' form__input-error' : '' "
           @input="onChangePhoneInput"
           v-bind="bindProps"
           id="phone1"
           name="phone"
           class="vue-tel-input">
        </vue-tel-input>
      </FormItem>

      <div class="form__item">
        <button
            type="submit"
            class="form__btn-submit"
        >
          get started Now!
        </button>
      </div>
    </form>
  </transition-group>
</template>

<script setup>
import {ref, reactive, onMounted, computed } from "vue";
import axios from "axios";

import {required, email, maxLength, alpha, minLength,  numeric} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {VueTelInput} from 'vue3-tel-input';
import 'vue3-tel-input/dist/vue3-tel-input.css';

import MyInput from "./components/MyInput.vue";
import FormItem from "@/components/formItem";

let token = '';
const userCountryCode = ref('');
const phoneValid = ref([]);

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  userGeo: "",
  urlParams: {},
});


const rules = computed(() => ({
  firstName: {required, alpha, maxLength: maxLength(20)},
  lastName: {required, alpha, maxLength: maxLength(20)},
  email: {required, email },
  // phone: {numeric, maxLength: maxLength(9), minLength: minLength(9)},
}))


const bindProps = {
  mode: "international",
  placeholder: "Enter a phone number",
  required: true,
  name: "telephone",
  maxLen: 25,
}

// функция проверяет валидацию поля vue-tel-input Phone при вводе номера телефона
const onChangePhoneInput = (phone, phoneObject) => {
  if (phoneObject?.formatted) {
    formData.phone = phoneObject.formatted;
    if(!phoneObject.valid) {
      debugger
      phoneValid.value = [{
        $message: 'Invalid phone number',
        $uid: 'phoneNumber'
      }]
    } else {
      phoneValid.value = []
    }
  }
}

// получения токена авторизации для GEO user
const getTokenAuth = async () => {
  const data = JSON.stringify({
    "username": "goodbot",
    "password": "~mi-!z-@-sm@ll-b0T!~"
  });

  const config = {
    method: 'post',
    url: 'https://geotool247.finance-ru.com/api/v1/auth/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  try {
    const response = await axios(config);
    return response.data.data.token;
  } catch (e) {
    console.log(e);
  }
}

// получения токена для GEO user
const getUserGeo = async () => {
  if(token === '' || token === undefined || token === null) {
    token = await getTokenAuth()
  }
  const config = {
    method: 'get',
    url: 'https://geotool247.finance-ru.com/api/v1/geo/?lang=ru',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  try {
    const response = await axios(config);
    debugger
    formData.userGeo = response.data.data;
    userCountryCode.value = response.data.data.country.iso;
  } catch (e) {
    console.log(e);
  }
}

// получение Get параметром из URL выполняется при отправки формы
const getUrlParams = () => {
  return (() => {
    let a = window.location.search;
    let b = new Object();
    a = a.substring(1).split("&");
    for (let i = 0; i < a.length; i++) {
      let c = a[i].split("=");
      b[c[0]] = c[1];
    }
    return b;
  })();
}

onMounted (  () => {
  getUserGeo()

  // не приходят данные (вроде не отправляется запрос)
  // const {userIp, userCountryCode} = useUserIp();
})

const v$ = useVuelidate(rules, formData);

const submitFrom = async (data) => {

  const result = await v$.value.$validate();
  console.log(result);
  if (result) {
    formData.urlParams = getUrlParams()
    console.log(formData)
    console.log('success')
  } else {
    console.log('no success')
  }
}
</script>

<style lang="scss">

#app {
  max-width: 450px;
  margin: 60px auto;
  font-size: 16px;
  color: #000;
  font-family: "Montserrat", Sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.form__item {
  position: relative;
}

.form__btn-submit {
  background-image: linear-gradient(166deg, #156cff 1%, #0e49ff);
  padding: 5px 20px;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 22px;
  box-shadow: 0 2px 10.9px 0.1px rgb(13 13 13 / 33%);
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background-image: linear-gradient(166deg, #156c00 1%, #0e4900);
  }
}

.form__errors {
  position: absolute;
  bottom: -10px;
  z-index: 10;
  padding: 3px 10px;
  color: red;
  font-size: 13px;
}

.form__input-error {
  border:  2px solid #ff000054 !important;
}

.vue-tel-input {
  border: 1px solid #304D91A8;
  margin: 10px 0 20px;

  input {
    font-size: 16px;
  }
}

</style>
