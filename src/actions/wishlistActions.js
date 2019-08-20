import { NEW_WISHLIST } from "./types";

export function newWishlist(data) {
    return function(dispatch) {
      axios({
        url: `http://localhost/api/users/${data.id}/`,
        method: "POST",
        data: data.wish,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    };
  }