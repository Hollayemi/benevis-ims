/* eslint-disable react/jsx-key */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ReportFilter = ({ setSearch, dropdown, status, acceptQuery, dropdownName }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
    const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
    const [filter, setFilter] = useState(searchParams.get("filter") || "");
    const [customer, setCustomer] = useState(searchParams.get("customer") || "");
    const [query, setQuery] = useState(searchParams.get("query") || "");


    const handleSubmit = (e) => {
        console.log(e)
        const params = new URLSearchParams(searchParams.toString());


        // Update date parameters
        if (query) {
            params.set("query", query);
        } else {
            params.delete("query");
        }

        if (startDate) {
            params.set("startDate", startDate);
        } else {
            params.delete("startDate");
        }

        if (endDate) {
            params.set("endDate", endDate);
        } else {
            params.delete("endDate");
        }

        if (filter && (filter && filter !== "all")) {
            params.set("filter", filter);
        } else {
            params.delete("filter");
        }

        if (customer && (customer && customer !== "all")) {
            params.set("customer", customer);
        } else {
            params.delete("customer");
        }

        router.push(`?${params.toString()}`);
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    // useEffect(() => {
    //     handleSubmit();
    // }, [startDate, endDate, filter, customer, router, searchParams]);

    return (
        <div className="flex items-center justify-end gap-2">

            {acceptQuery &&  <div className="flex w-full max-w-[300px] items-center gap-2 rounded-md px-1.5 text-sm ring-1 ring-primary focus-within:ring-2">
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-6 cursor-pointer text-[#1b2cc5]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    name="query"
                    value={query}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => { setQuery(e.target.value); setSearch(e.target.value) }}
                    placeholder="Search"
                    className="w-full bg-transparent py-2 placeholder:capitalize focus:outline-none"
                />
            </div>}
            {/* Date Range Input */}
            <div className="flex w-full max-w-[400px] items-center gap-2 rounded-md px-1.5 text-sm ring-1 ring-primary focus-within:ring-2">
                <label htmlFor="startDate">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-6 cursor-pointer text-[#1b2cc5]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                    </svg>
                </label>
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-32 bg-transparent py-2 focus:outline-none"
                        placeholder="Start Date"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-32 bg-transparent py-2 focus:outline-none"
                        placeholder="End Date"
                    />
                </div>
            </div>

            {/* filter */}
            {status && <button className="flex items-center rounded-md bg-primary/40 px-4 py-2 shadow-sm ring-1 ring-primary backdrop-blur hover:bg-primary/70">
                <svg
                    className="mr-1 size-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-.447.832l-4 2.5A1 1 0 019 21.5V12.414L3.293 6.707A1 1 0 013 6V4z"
                    />
                </svg>
                <select
                    name="filter"
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-[70px] bg-transparent text-sm font-semibold text-gray-800 focus:outline-none"
                >
                    <option value="all">Filters</option>
                    <option value="clear">All</option>
                    <option value="due">Due Sales</option>
                    <option value="completed">Complete Sales</option>
                </select>
            </button>}

            {dropdownName && <button className="flex items-center rounded-md bg-primary/40 px-4 py-2 shadow-sm ring-1 ring-primary backdrop-blur hover:bg-primary/70">
                <svg
                    className="mr-1 size-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-.447.832l-4 2.5A1 1 0 019 21.5V12.414L3.293 6.707A1 1 0 013 6V4z"
                    />
                </svg>
                <select
                    name={dropdownName}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-[70px] bg-transparent text-sm font-semibold text-gray-800 focus:outline-none"
                >
                    <option value="">All</option>
                    {dropdown?.map((e) =>
                        <option value={e}>{e}</option>
                    )}
                </select>
            </button>}
        </div>
    );
};

export default ReportFilter;