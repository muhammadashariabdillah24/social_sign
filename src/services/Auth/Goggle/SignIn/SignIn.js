import { baseUrl } from "../../../Base/Base";

const GoggleSignInServices = async (data) => {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json;charset=UTF-8');
    myHeader.append('Accept', 'application/json;charset=UTF-8');

    const consumeSignIn = await fetch(`${baseUrl}/tasks/v1/goggle-sign-in`, {
        method: 'POST',
        headers: myHeader,
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return consumeSignIn;
}

export default GoggleSignInServices;