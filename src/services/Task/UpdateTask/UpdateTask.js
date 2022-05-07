import { baseUrl } from "../../Base/Base";

const UpdateTask = async (id, data) => {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json;charset=UTF-8');
    myHeader.append('Accept', 'application/json;charset=UTF-8');

    const consumeUpdateTask = await fetch(`${baseUrl}/tasks/v1/update-task/${id}`, {
        method: 'PUT',
        headers: myHeader,
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return consumeUpdateTask;
}

export default UpdateTask;