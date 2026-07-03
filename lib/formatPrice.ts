export const formatPrice = (price: string | null): string => {
    if (price === "Gratis" || !price) {
        return "free"
    }

    const priceNumber = price ? parseFloat(price.replace(",", ".")) : 0

    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR"
    }).format(priceNumber)
}