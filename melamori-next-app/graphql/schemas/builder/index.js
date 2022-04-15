

// export const calculationQuery = () => {
//
//     const mattresses = []
//
//     const QUERY = `
//         query CALCULATION {
//             ${mattresses.map((i) => `
//                 mattresses_by_id(
//                     id: "c94f26b2-3aa9-4915-95a7-8ce0d98662d9"
//                 ){
//                     price_list (
//                         filter: {
//                             mattresses_prices_id: {
//                                 id: {
//                                     _eq: "e930af07-9a08-4d34-9ec9-0063778121a9"
//                                 }
//                             }
//                         }
//                     ) {
//                         mattresses_prices_id {
//                             price
//                             sale_percentage
//                         }
//                     }
//                 }
//             `)}
//         }
//     `
//
//     return [
//         QUERY
//     ]
// }
