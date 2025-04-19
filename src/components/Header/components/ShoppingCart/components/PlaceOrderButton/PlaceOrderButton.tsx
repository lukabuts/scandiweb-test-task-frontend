import { useMutation } from "@apollo/client";
import { PLACE_ORDER_MUTATION } from "@/graphql";
import { useCartStore, useMessageStore } from "@/stores";

function PlaceOrderButton({ cartItems }: { cartItems: CartProduct[] }) {
  const [placeOrder, { loading }] = useMutation(PLACE_ORDER_MUTATION);
  const { clearCart, closeCart } = useCartStore();
  const { showMessage, dismissMessage } = useMessageStore();

  const handlePlaceOrder = async () => {
    if (!cartItems.length) return;
    try {
      const products = cartItems.map((item) => ({
        product_id: item.productId,
        attributes: item.attributes.map((attr) => ({
          attribute_id: attr.id,
          item_id: attr.items.find((i) => i.selected)?.id,
        })),
        quantity: item.quantity,
      }));

      const { data } = await placeOrder({
        variables: { products },
      });

      const response = data?.placeOrder;
      if (response.success) {
        showUserMessage(true, "Order placed successfully!");
        clearCart();
        closeCart();
      } else {
        showUserMessage(false, data?.placeOrder?.message || "Order failed");
      }
    } catch {
      showUserMessage(false, "Failed to place order");
    }
  };

  function showUserMessage(success: boolean, message: string) {
    const id = `message-${Date.now()}`;
    showMessage(success, message, id);
    setTimeout(() => {
      dismissMessage(id);
    }, 3100);
  }

  return (
    <button
      className="action-button p-3"
      onClick={handlePlaceOrder}
      disabled={loading || !cartItems.length}
    >
      {loading ? "Placing Order..." : "Place Order"}
    </button>
  );
}

export default PlaceOrderButton;
