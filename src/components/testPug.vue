<template>
 <div>
   {{userIp}}
 </div>
  <div>
    {{userCountryCode}}
  </div>
</template>

<script>
import {useUserIp} from "@/hooks/useUserIp";

export default {
  data() {
    return {
      userIp2: "d42efwds",
      userCountryCode2: "12ew",

    }
  },
  setup(props) {
    const {userIp, userCountryCode} = useUserIp();
    console.log(userIp)
    debugger

    return {
      userIp, userCountryCode
    }
  }
}

</script>

<style lang="scss" scoped>
  .test {
    color: red;
    padding: 30px;
    background-color: gray;
    &__test2 {

    }
  }
</style>
