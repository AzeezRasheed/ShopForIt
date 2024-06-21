export const calculateSubtotal = (cart) => {
  return cart.reduce((total, cartItem) => {
    const price = cartItem.item?.newPrice;
    const totalPrice = price * cartItem.quantity;
    return total + totalPrice;
  }, 0);
};
