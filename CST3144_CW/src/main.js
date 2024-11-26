import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/main.css'
// import main app component
import App from './App.vue'
import { createApp } from 'vue'

// mount main app component on div id=app
const app = createApp(App)

app.mount('#app')
