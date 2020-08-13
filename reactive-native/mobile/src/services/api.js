import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3333'
})

export default api;

// No Android: Transferir a porta do emulador para a porta da nossa máquina
// (adb reverse tcp:3333 tcp:3333)