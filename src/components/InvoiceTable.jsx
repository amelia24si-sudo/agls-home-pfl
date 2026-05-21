import { CardContainer } from "./CardContainer";
import { SectionHeader } from "./SectionHeader";

export const InvoiceTable = ({ children }) => (
    <CardContainer className="lg:col-span-2">
        <SectionHeader title="Invoices" actionLabel="View All" />
        <div className="space-y-6">{children}</div>
    </CardContainer>
);