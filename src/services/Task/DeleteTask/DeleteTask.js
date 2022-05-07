import { baseUrl } from "../../Base/Base";

const DeleteAllTask = async (id) => {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json;charset=UTF-8');
    myHeader.append('Accept', 'application/json;charset=UTF-8');

    const consumeDeleteTask = await fetch(`${baseUrl}/tasks/v1/delete-task/${id}`, {
        method: 'DELETE',
        headers: myHeader,
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return consumeDeleteTask;
}

export default DeleteAllTask;