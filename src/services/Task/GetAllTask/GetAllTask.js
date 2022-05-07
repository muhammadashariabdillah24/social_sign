import { baseUrl } from "../../Base/Base";

const GetAllTask = async () => {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json;charset=UTF-8');
    myHeader.append('Accept', 'application/json;charset=UTF-8');

    const consumeAddTask = await fetch(`${baseUrl}/tasks/v1/get-all-task`, {
        method: 'GET',
        headers: myHeader,
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return consumeAddTask;
}

export default GetAllTask;