// noinspection GraphQLUnresolvedReference

import {gql} from "@apollo/client";






export const bedCollection = gql`
    query myQuery($offset: Int, $limit: Int){
        bed_collection (offset: $offset, limit: $limit){
            additional_options {
                id
                additional_options_id {
                    id
                    percentage
                    price
                    title
                    description
                }
            }
            image {
                id
                title
            }
            title
            id
            price_list {
                bed_prices_id {
                    id
                    price
                    status
                    sale_percentage
                    bed_size_relation {
                        height
                        length
                        width
                        sleep_size
                    }
                    bed_cloth_category_relation {
                        category
                        id
                    }
                }
            }
        }
    }
`

export const softFurnitureCollection = gql`query myQuery($offset: Int, $limit: Int){
    soft_furniture (offset: $offset, limit: $limit){
        title
        furniture_type
        id
        image {
            id
            title
        }
        price_list {
            soft_furniture_prices_id {
                price
                sale_percentage
                status
                soft_furniture_cloth_category_relation {
                    category
                }
                soft_furniture_size_relation {
                    basic_size
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
                sale_percentage
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
        price_list {
            bed_prices_id {
                bed_cloth_category_relation {
                    category
                    id
                }
                bed_size_relation {
                    id
                    sleep_size
                    height
                    length
                    width
                }
                price
                status
                sale_percentage
            }
        }
        additional_options {
            additional_options_id {
                title
                description
            }
        }
    }
}
`
export const sofaCollectionById = gql`query myQuery($id:ID!){
    soft_furniture_by_id(id: $id) {
        title
        image {
            id
            title
        }
        price_list {
            sofa_prices_id {
                sofa_cloth_category_relation {
                    category
                }
                sofa_size_relation {
                    sleep_size
                    sofa_size
                }
                price
                status
                sale_percentage
            }
        }
        additional_options {
            additional_options_id {
                title
                description
            }
        }
    }
}
`

export const mattressCollectionById = gql`query myQuery($id:ID!){
    mattresses_by_id(id: $id) {
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
                sale_percentage
                mattress_size_relation {
                    sleep_size
                }
            }
        }
    }
}
`
