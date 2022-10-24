import axios from "axios";
import {ref, onMounted} from 'vue';

export function useUserIp() {
    debugger
    const userIp = ref("")
    const userCountryCode = ref("")
    const fetching = async () => {
        try {
            const response = await axios.get(`https://ipapi.co/json/`);
            console.log(response)
            debugger
            userIp.value = response.data.ip;
            userCountryCode.value = response.data.country_code;
        } catch (e) {
            console.log('Ошибка')
        } finally {
            // isPostsLoading.value = false;
        }
    }

    onMounted(fetching)
    console.log(fetching)
    return {
        userIp, userCountryCode
    }
}


