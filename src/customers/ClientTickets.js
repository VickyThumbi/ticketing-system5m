import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ClientTickets.css";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { db } from "../database/firebase";
import Ticket_info from "./Ticket_info";
import { useStateValue } from "../Redux/StateProvider";
//import { query, collection, onSnapshot } from "firebase/firestore";

function ClientTickets() {
  const [tickets, setTickets] = useState([]);
  const [{ user }, dispatch] = useStateValue();



  useEffect(() => {
    db.collection("tickets").onSnapshot((snapshot) => {
      console.log(snapshot.docs.map((doc) => doc.data().ticket));
      setTickets(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
        //   .orderBy("timestamp", "desc")
      );
    });
  }, []);



  return (
    <div className="client_tickets">
      <div className="client_tickets_header">
       
        <div className="clients_tickets_header_title">
          {tickets?.length === 0 ? (
            <h3>You have no open tickets 😢</h3>
          ) : (
            <h3>My Total Tickets: {tickets.length} </h3>
          )}
          {/* <h3>My tickets:</h3> */}
        </div>

        <div className="clients_tickets_display">
          
          {tickets.map((ticket) => (
            <Ticket_info
              key={ticket.id}
              // open={ticket.data.open}
              id={ticket.id}
              assigned={ticket.data.assigned}
              status={ticket.data.status}
              agent={ticket.data.agent}
              subject={ticket.data.subject}
              timestamp={ticket.data.timestamp}
              customer={ticket.data.customer}
            />
          ))}
        </div>
        {/* //if target is closed, then show closed tickets
        //if target is open, then show open tickets */}

      </div>
    </div>
  );
}

export default ClientTickets;
