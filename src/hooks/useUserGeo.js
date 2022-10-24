import axios from 'axios';
import {ref, onMounted} from "vue";

export function useUserGeo() {

    const token = ref("");

    let data = JSON.stringify({
        "username": "goodbot",
        "password": "~mi-!z-@-sm@ll-b0T!~"
    });

    let config = {
        method: 'post',
        url: 'https://geotool247.finance-ru.com/api/v1/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };
    const fetching = async () => {
        try {
            const response = await axios(config);
            token.value = response.data.data.token;
            console.log(token);
        } catch (e) {
            console.log(e);
        } finally {
            // this.isFetchingPage = false;
        }
    }

    onMounted(fetching);

    return {
        token
    }
}
