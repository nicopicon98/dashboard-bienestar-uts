const capitalize = (value: string = ""): string => {
  const valueLower = value.toLowerCase()
  return valueLower.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

export default capitalize;