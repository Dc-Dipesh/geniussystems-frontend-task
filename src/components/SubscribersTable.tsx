import { useEffect, useState } from "react";
import { ISubscriber } from "../types";
import { convertTimestampToFormattedDate } from "../utils/utils";
import { Link } from "react-router";

const SubscribersTable = ({
  subscribers,
  isLoading,
}: {
  subscribers: ISubscriber[];
  isLoading: boolean;
}) => {
  const [sort, setSort] = useState("none");
  const [filter, setFilter] = useState("all");
  const [filteredSubscribers, setFilteredSubscribers] = useState<ISubscriber[]>(
    []
  );
  const [sortedSubscribers, setSortedSubscribers] = useState<ISubscriber[]>([]);
  //   this is to filter the subscribers based on the filter selected
  useEffect(() => {
    switch (filter) {
      case "all":
        setFilteredSubscribers(subscribers);
        break;
      case "active":
        setFilteredSubscribers(
          subscribers.filter((subscriber) => subscriber.active === "1")
        );
        break;
      case "inactive":
        setFilteredSubscribers(
          subscribers.filter((subscriber) => subscriber.active === "0")
        );
        break;
      default:
        setFilteredSubscribers(subscribers);
        break;
    }
  }, [filter, subscribers]);

  useEffect(() => {
    switch (sort) {
      case "none":
        setSortedSubscribers([...filteredSubscribers]); // Ensure new array
        break;
      case "newest":
        setSortedSubscribers(
          [...filteredSubscribers].sort(
            (a, b) => parseInt(a.join_date) - parseInt(b.join_date)
          )
        );
        break;
      case "oldest":
        setSortedSubscribers(
          [...filteredSubscribers].sort(
            (a, b) => parseInt(b.join_date) - parseInt(a.join_date)
          )
        );
        break;
      case "name":
        setSortedSubscribers(
          [...filteredSubscribers].sort((a, b) =>
            (a.first_name + a.middle_name + a.last_name).localeCompare(
              b.first_name + b.middle_name + b.last_name
            )
          )
        );
        break;
      default:
        setSortedSubscribers([...filteredSubscribers]); // Ensure new array
        break;
    }
  }, [sort, filteredSubscribers]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="form-select ">
          <span>Filter By:</span>
          <select
            name="filter"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value={""}>Select a option </option>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="form-select ">
          <span>Sort By:</span>
          <select
            name="sort"
            onChange={(e) => setSort(e.target.value)}
            value={sort}
          >
            <option value={"none"}>Select a option </option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value={"name"}>Name</option>
          </select>
        </div>
      </div>
      <div className="table_container">
        <table className="subscriber_table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Join Date</th>
              {/* <th>Subscription</th> */}
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          {
            //   this is to show the loading spinner when the data is still loading
            isLoading && (
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center">
                    <div className="spinner"></div>
                  </td>
                </tr>
              </tbody>
            )
          }
          <tbody>
            {sortedSubscribers.map((subscriber, index) => (
              <tr key={subscriber.id}>
                <td>{index + 1}</td>
                <td>
                  {subscriber.first_name +
                    " " +
                    subscriber.middle_name +
                    " " +
                    subscriber.last_name}
                </td>
                <td>{subscriber.email}</td>
                <td>{convertTimestampToFormattedDate(subscriber.join_date)}</td>
                {/* <td>{subscriber.subscription}</td> */}
                <td>
                  <span
                    className={
                      subscriber.active === "1"
                        ? "badge  active"
                        : "badge inactive"
                    }
                  >
                    {subscriber.active === "1" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <Link to={`/dashboard/subscribers/${subscriber.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscribersTable;
