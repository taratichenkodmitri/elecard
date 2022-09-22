import './styles/main.css'
import {App} from "./modules/app";

let app = new App();
await app.init();
app.run();



