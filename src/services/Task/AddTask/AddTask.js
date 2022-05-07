import { baseUrl } from "../../Base/Base";

const AddTask = async (data) => {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json;charset=UTF-8');
    myHeader.append('Accept', 'application/json;charset=UTF-8');

    const consumeAddTask = await fetch(`${baseUrl}/tasks/v1/add-task`, {
        method: 'POST',
        headers: myHeader,
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return consumeAddTask;
}

export default AddTask