import { MdHistory } from "react-icons/md";
import { CardContainer } from "./CardContainer";

export const ActivityList = ({ children }) => (
    <CardContainer>
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-bold text-xl">Recent Activity</h3>
            <span className="text-gray-500 text-xs flex items-center gap-1"><MdHistory /> April 2026</span>
        </div>
        <div className="space-y-6">{children}</div>
    </CardContainer>
);