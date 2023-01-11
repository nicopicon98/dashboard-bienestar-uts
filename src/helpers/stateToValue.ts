const stateToValue = (value: number) => {
  switch (value) {
    case 0:
      return "rechazada";
    case 1:
      return "aceptada";
    case 2:
      return "asistida";
    case 3:
      return "ausente";
    default:
      break;
  }
};

export default stateToValue;
