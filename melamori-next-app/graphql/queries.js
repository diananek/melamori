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
          bed_size_relation {
              bed_size
              sleep_size
          }
      }
    }
  }
    }
    `

export const sofaCollection = gql`{
    sofa_collection {
        image {
            id
            title
        }
        title
        id
        price_list {
            sofa_prices_id {
                price
                status
                sofa_size_relation {
                    sleep_size
                    sofa_size
                }
            }
        }
    }
}
`

export const mattressCollection = gql`{
    mattresses {
        image {
            id
            title
        }
        id
        title
        price_list {
            mattresses_prices_id {
                price
                status
                mattress_size_relation {
                    sleep_size
                }
            }
        }
    }
}
`

export const bedCollectionById = gql`query myQuery($id:ID!){
    bed_collection_by_id(id: $id) {
        title
        image {
            id
            title
        }
    }
}
`