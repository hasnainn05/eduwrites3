import { Order } from "@/app/admin/orders/page";

const ORDERS_STORAGE_KEY = "submitted_orders";

export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
}

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;

  const existingOrders = getOrders();
  const updatedOrders = [order, ...existingOrders];
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getOrdersByStatus(
  status: "pending" | "in_progress" | "completed",
): Order[] {
  const allOrders = getOrders();
  return allOrders.filter((order) => order.status === status);
}

export function updateOrderStatus(
  orderId: string,
  status: "pending" | "in_progress" | "completed",
): void {
  if (typeof window === "undefined") return;

  const orders = getOrders();
  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status } : order,
  );
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
}

export function clearAllOrders(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ORDERS_STORAGE_KEY);
}
