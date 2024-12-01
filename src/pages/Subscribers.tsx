import { useEffect, useState } from "react";
import { ISubscriber } from "../types";
import { GetSubscribers } from "../action";
import toast from "react-hot-toast";
import SubscribersTable from "../components/SubscribersTable";
import "../assets/css/subscriber.css";
const Subscribers = () => {
  const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(subscribers);
  useEffect(() => {
    GetSubscribers()
      .then((data) => {
        setSubscribers(data);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>Subscribers</h1>
      <SubscribersTable subscribers={subscribers} isLoading={loading} />
    </div>
  );
};

export default Subscribers;
