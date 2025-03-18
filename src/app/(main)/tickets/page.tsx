"use server";
import TicketForm from "./ticket-form";

const TicketPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1F2937]">Support Center</h1>
            <p className="mt-2 text-muted-foreground">
              Submit a ticket to get help from our support team
            </p>
          </div>
          <TicketForm />
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
