export const formatCurrency = (amount, currency = "NGN", sign = "NG") => {
  const formattedCurrencyUS = new Intl.NumberFormat(`en-${sign}`, {
    style: "currency",
    currency,
  }).format(amount);
  return formattedCurrencyUS;
};

export const reshapePrice = (price) => {
  if (typeof parseInt(price) === 'number') {
    return `₦ ${parseFloat(price).toLocaleString()}`
  }
}

export const formatDate = (
  value = new Date(),
  newFormat
) => {
  if (!value) return value;

  const formatting = { month: "short", day: "numeric", year: "numeric", ...newFormat }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (
  value,
  toTimeForCurrentDay = true,
  format = {}
) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric", ...format };
  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};