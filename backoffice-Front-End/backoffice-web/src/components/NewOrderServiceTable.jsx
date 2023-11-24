import React from "react";

export const NewOrderServiceTable = ({ items, checkActiveDetail }) => {
  return (
    <table className="table table-hover" style={{ minWidth: "100%" }}>
      {/* Header de la table */}
      <thead
        style={{
          position: "sticky",
          top: 0,
          borderBottom: "2px solid black",
        }}
      >
        <tr style={{ textAlign: "center" }}>
          <th scope="col" width="5%">
            #
          </th>
          <th scope="col" width="10%">
            Item
          </th>
          <th scope="col" width="50%">
            Detalle
          </th>
          <th scope="col" width="10%">
            Cantidad
          </th>
          <th scope="col" width="10%">
            Precio Unitario
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((detail) => (
          <tr
            key={detail.id}
            style={{ marginBottom: "0px", textAlign: "center" }}
          >
            <td>
              <input
                type="checkbox"
                id={detail.id}
                className="custom-checkbox"
                onChange={(event) => checkActiveDetail(event, detail)}
                style={{ color: "#000000", cursor: "pointer" }}
              />
            </td>
            <td>{detail.name}</td>
            <td className="text-overflow">{detail.description}</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="input-group"
                style={{
                  width: "70px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <input
                  type="number"
                  className="form-control"
                  style={{
                    width: "100%",
                    height: "25px",
                    textAlign: "center",
                  }}
                  value={1}
                  disabled={true}
                />
              </div>
            </td>
            <td>${detail.basePrice.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
