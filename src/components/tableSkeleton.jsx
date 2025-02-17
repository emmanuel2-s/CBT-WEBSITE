import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TableSkeleton() {
  return (
    <table className="table-auto min-w-full team-table">
      <thead>
        <tr>
          <th>
            <Skeleton width={150} height={40} />
          </th>
          <th>
            <Skeleton width={150} height={40} />
          </th>
          <th>
            <Skeleton width={150} height={40} />
          </th>
          <th></th>
          <th>
            <Skeleton width={150} height={40} />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            <td>
              <Skeleton width={100} />
            </td>
            <td>
              <Skeleton width={100} />
            </td>
            <td>
              <Skeleton width={150} />
            </td>
            <td>
              <Skeleton width={150} />
            </td>
            <td>
              <Skeleton width={150} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
