"use client";

import { gql, useQuery } from "@apollo/client";
import { Address } from "~~/components/scaffold-eth";

const TransfersTable = () => {
  const TRANSFERS_GRAPHQL = `
  query MyQuery {
    transfers(first: 10) {
      id
      from
      to
      tokenId
    }
  }
`;

  const TRANSFERS_GQL = gql(TRANSFERS_GRAPHQL);
  const { data: transfersData, error } = useQuery(TRANSFERS_GQL, { fetchPolicy: "network-only" });

  // Subgraph may not be configured yet
  if (error) {
    return <></>;
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="overflow-x-auto shadow-2xl rounded-xl">
        <table className="table bg-base-100 table-zebra">
          <thead>
            <tr className="rounded-xl">
              <th className="bg-primary"></th>
              <th className="bg-primary">From</th>
              <th className="bg-primary">To</th>
              <th className="bg-primary">TokenID</th>
            </tr>
          </thead>
          <tbody>
            {transfersData?.transfers?.map((transfer: any, index: number) => {
              return (
                <tr key={transfer.id}>
                  <th>{index + 1}</th>
                  <td>
                    <Address address={transfer.from} />
                  </td>
                  <td>
                    <Address address={transfer.to} />
                  </td>
                  <td>{transfer.tokenId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransfersTable;
