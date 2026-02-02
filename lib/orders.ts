export async function updateOrderStatus(
  orderId: string,
  status: "pending" | "in-progress" | "completed" | "cancelled"
) {
  const res = await fetch(`/api/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update order status");
  }

  return res.json();
}