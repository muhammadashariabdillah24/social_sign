import { baseUrl } from "../../../Base/Base";

const FacebookSignUpServices = async (data) => {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json;charset=UTF-8');
    myHeader.append('Accept', 'application/json;charset=UTF-8');

    const consumeSignUp = await fetch(`${baseUrl}/tasks/v1/facebook-sign-up`, {
        method: 'POST',
        headers: myHeader,
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return consumeSignUp;
}

export default FacebookSignUpServices;