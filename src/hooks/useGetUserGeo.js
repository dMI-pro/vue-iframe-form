import axios from 'axios';

// get token for geo user
async function getTokenForGeoUser() {
    try {
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
        const response = await axios(config);
        return response.data.data.token;
    } catch (e) {
        console.log(e);
    }
}

// get geo data of the user
export async function useGetUserGeo() {
    try {
        const token = await getTokenForGeoUser();
        debugger

        const config = {
            method: 'get',
            url: 'https://geotool247.finance-ru.com/api/v1/geo/?lang=ru',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        const response = await axios(config);
        return {
            userGeo: response.data.data,
            countryCode: response.data.data.country.iso
        }
    } catch (e) {
        console.log(e);
    }
}
