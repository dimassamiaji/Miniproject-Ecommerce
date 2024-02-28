// pages/events/[eventid].jsx

import { useRouter } from "next/router";
import React from "react";
// ... other imports like components

const EventTransactionPage = () => {
  const router = useRouter();
  const { eventid } = router.query; // This is how you can access the event ID

  // You can now use eventid to fetch event details or handle transactions

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        Transaction for Event ID: {eventid}
      </h1>
      {/* ... rest of your transaction page content */}
    </div>
  );
};

export default EventTransactionPage;
