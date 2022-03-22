export function getPageUrl (collectionName) {
    if(collectionName === 'bed_collection') {
        return '/catalog/beds/'
    }
    if(collectionName === 'soft_furniture') {
        return '/catalog/sofas/'
    }
    if(collectionName === 'mattresses') {
        return '/catalog/mattresses/'
    }
}