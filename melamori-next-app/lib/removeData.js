export function removeData(cookies, id) {
    for (const index in cookies) {
        if(cookies[index].id === id) {
            cookies.splice(index, 1)
        }
    }
}