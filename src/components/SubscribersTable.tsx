import { useEffect, useState } from "react";
import { ISubscriber } from "../types";
import { convertTimestampToFormattedDate } from "../utils/utils";
import { Link } from "react-router";
import { useDebounce } from "../hooks/useDebounce";

const SubscribersTable = ({
  subscribers,
  isLoading,
}: {
  subscribers: ISubscriber[];
  isLoading: boolean;
}) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [displaySubscribers, setDisplaySubscribers] = useState<ISubscriber[]>(
    []
  );

  useEffect(() => {
    let filtered = subscribers;

    // - If `filter` is set to "active", include only subscribers where `active` is "1".
    // - If `filter` is set to "inactive", include only subscribers where `active` is "0".
    // - If `filter` is "all", include all subscribers.
    if (filter !== "all") {
      filtered = filtered.filter(
        (sub) => sub.active === (filter === "active" ? "1" : "0")
      );
    }

    // - Check if the `debouncedSearch` term matches any part of the subscriber's full name
    //   (first name, middle name, or last name).
    // - Perform a case-insensitive search by converting both the search term and the name to lowercase.
    if (debouncedSearch) {
      filtered = filtered.filter((sub) =>
        `${sub.first_name} ${sub.middle_name} ${sub.last_name}`
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      );
    }

    // Sort the results
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "newest")
        // Sort by join date in descending order (newest first)
        return parseInt(b.join_date) - parseInt(a.join_date);
      if (sort === "oldest")
        // Sort by join date in ascending order (oldest first)
        return parseInt(a.join_date) - parseInt(b.join_date);
      if (sort === "name")
        // Sort alphabetically by the subscriber's full name (locale-sensitive comparison)
        return `${a.first_name} ${a.middle_name} ${a.last_name}`.localeCompare(
          `${b.first_name} ${b.middle_name} ${b.last_name}`
        );
      return 0;
    });

    setDisplaySubscribers(sorted);
  }, [filter, sort, debouncedSearch, subscribers]);

  return (
    <div>
      <div className="flex justify-between flex-wrap gap-4 mb-4">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <div className="form-select">
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
          <span>Short By:</span>
          <select
            name="short"
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
      <div className="table-container">
        <table className="subscriber-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center">
                  <div className="spinner"></div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {displaySubscribers.map((sub, index) => (
                <tr key={sub.id}>
                  <td>{index + 1}</td>
                  <td>
                    {sub.first_name} {sub.middle_name} {sub.last_name}
                  </td>
                  <td>{sub.email}</td>
                  <td>{convertTimestampToFormattedDate(sub.join_date)}</td>
                  <td>
                    <span
                      className={`badge ${
                        sub.active === "1" ? "active" : "inactive"
                      }`}
                    >
                      {sub.active === "1" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <Link to={`/dashboard/subscribers/${sub.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SubscribersTable;
