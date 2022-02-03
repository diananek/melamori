import {gql} from "@apollo/client";

export const bedCollection = gql`{
       bed_collection {
           image {
      id
      title
    }
    title
    id
    price_list {
      bed_prices_id {
        price
        status
      }
    }
  }
    }
    `