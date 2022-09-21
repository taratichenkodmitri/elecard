import './styles/main.css'

import { CardViewer } from "./modules/cardViewer";
import { Loader } from "./modules/loader";

let loader = new Loader();
await loader.getJson();

let cardViewer = new CardViewer(loader.getDownloadedData());
cardViewer.render();
