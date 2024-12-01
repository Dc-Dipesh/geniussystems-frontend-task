import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { GetSubscriber } from "../action";
import "../assets/css/subscriberDetail.css";
import { ISubscriptionDetails } from "../types";
import { convertTimestampToFormattedDate } from "../utils/utils";
const SubscriberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [SubscriberDetail, setSubscriberDetail] =
    useState<ISubscriptionDetails>();
  useEffect(() => {
    GetSubscriber(parseInt(id!))
      .then((data) => {
        setSubscriberDetail(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  console.log(SubscriberDetail);
  return (
    <div className="subscriber-details">
      {/* Header Section */}
      <header className="subscriber-header">
        <h1 className="subscriber-title">
          {SubscriberDetail?.first_name} {SubscriberDetail?.middle_name}{" "}
          {SubscriberDetail?.last_name}
        </h1>
        <span
          className={`status-badge ${
            SubscriberDetail?.active === "1" ? "active" : "inactive"
          }`}
        >
          {SubscriberDetail?.active === "1" ? "Active" : "Inactive"}
        </span>
      </header>

      {/* General Details */}
      <section className="details-card">
        <h2 className="section-title">General Information</h2>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Username</span>
            <span className="detail-value">{SubscriberDetail?.username}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">{SubscriberDetail?.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Address</span>
            <span className="detail-value">{SubscriberDetail?.address}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Country</span>
            <span className="detail-value">{SubscriberDetail?.country}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Join Date</span>
            <span className="detail-value">
              {convertTimestampToFormattedDate(SubscriberDetail?.join_date!)}
            </span>
          </div>
        </div>
      </section>

      <section className="details-card">
        <h2 className="section-title">Subscription Details</h2>
        <table className="subscriptions-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Package</th>
              <th>Expires On</th>
            </tr>
          </thead>
          <tbody>
            {SubscriberDetail?.subscription?.length === 0 && (
              <tr>
                <td colSpan={3} className="no-data">
                  No subscription data available
                </td>
              </tr>
            )}
            {SubscriberDetail?.subscription?.map((sub, i) => (
              <tr key={sub.id}>
                <td>{i + 1}</td>
                <td>{sub.package}</td>
                <td>{sub.expires_on}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default SubscriberDetail;
