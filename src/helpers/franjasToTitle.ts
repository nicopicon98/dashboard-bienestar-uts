export const franjasToTitle = (franja: string) => {
  let lastMessage = "Franja: ";
  switch (franja) {
    case "0":
      lastMessage += "06:00 - 07:00"
      break
    case "1":
      lastMessage += "07:00 - 08:00"
      break;
    case "2":
      lastMessage += "08:00 - 09:00"
      break;
    case "3":
      lastMessage += "09:00 - 10:00"
      break;
    case "4":
      lastMessage += "10:00 - 11:00"
      break;
    case "5":
      lastMessage += "11:00 - 12:00"
      break;
    case "6":
      lastMessage += "12:00 - 13:00"
      break;
    case "7":
      lastMessage += "13:00 - 14:00"
      break;
    case "8":
      lastMessage += "14:00 - 15:00"
      break;
    case "9":
      lastMessage += "15:00 - 16:00"
      break;
    case "10":
      lastMessage += "16:00 - 17:00"
      break;
    case "11":
      lastMessage += "17:00 - 18:00"
      break;
    default:
      break;
  }
  return lastMessage
}

export const franjasToValue = (franja: string) => {
  switch (franja) {
    case "0":
      return "06:00 - 07:00"
    case "1":
      return "07:00 - 08:00"
    case "2":
      return "08:00 - 09:00"
    case "3":
      return "09:00 - 10:00"
    case "4":
      return "10:00 - 11:00"
    case "5":
      return "11:00 - 12:00"
    case "6":
      return "12:00 - 13:00"
    case "7":
      return "13:00 - 14:00"
    case "8":
      return "14:00 - 15:00"
    case "9":
      return "15:00 - 16:00"
    case "10":
      return "16:00 - 17:00"
    case "11":
      return "17:00 - 18:00"
    default:
      return "07:00 - 08:00";
  }
}