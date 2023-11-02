import { useState } from "react";

export const DetailOrderTable = ({
  detail,
  checkActiveDetail,
  updateQuantity,
}) => {
  function handleQuantity(event) {
    updateQuantity({ detail, quantity: Number(event.target.value) });
  }
  return (
    <tr key={detail.id} style={{ marginBottom: "0px" }}>
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
      <td>{detail.description}</td>
      <td>
        <input
          type="number"
          onChange={(event) => handleQuantity(event)}
          value={detail.quantity}
        />
      </td>
      <td>${detail.basePrice}</td>
    </tr>
  );
};
