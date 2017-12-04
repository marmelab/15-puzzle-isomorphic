export default function fetchErrorsHandler(res) {
    return new Promise((resolve, reject) => {
        res.ok ? resolve(res) : reject(res.statusText);
    });
}
