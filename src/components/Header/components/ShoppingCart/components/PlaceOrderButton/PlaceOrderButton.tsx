import { useMutation } from "@apollo/client";
import { PLACE_ORDER_MUTATION } from "@/graphql";
import { useCartStore } from "@/stores";

function PlaceOrderButton({ cartItems }: { cartItems: CartProduct[] }) {
  const [placeOrder, { loading }] = useMutation(PLACE_ORDER_MUTATION);
  const { clearCart } = useCartStore();

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

      if (data?.placeOrder?.success) {
        clearCart();
      }
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

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
