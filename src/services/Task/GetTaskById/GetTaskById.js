import { baseUrl } from "../../Base/Base";

const GetTaskById = async (id) => {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json;charset=UTF-8');
    myHeader.append('Accept', 'application/json;charset=UTF-8');

    const consumGetTaskById = await fetch(`${baseUrl}/tasks/v1/get-task-by-id/${id}`, {
        method: 'GET',
        headers: myHeader,
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return consumGetTaskById;
}

export default GetTaskById;