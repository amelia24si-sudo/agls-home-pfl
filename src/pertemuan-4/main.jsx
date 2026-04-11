import { createRoot } from "react-dom/client";
import './tailwind.css';
import Frame from "./Frame";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <Frame/>
        </div>
    )