export const ratingColorPicker = (star: number) => {
    switch (star) {
      case 5:
        return {color: "#00c759" , type: "Awesome"};
        break;
      case 4:
        return {color: "#33ff00" , type: "Great"};
        break;
      case 3:
        return {color: "#ffea04" , type: "Good"};
        break;
      case 2:
        return {color: "#ffae00" , type: "Ok"};
        break;
      default:
        return {color: "#ff5252" , type: "Awful"};
        break;
    }
  };

