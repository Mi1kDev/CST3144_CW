// DataManager is meant to be a way for all components to access relevant information without the need for many unnecessary signals or props
// It is a singleton object meaning the same instance can be accessed from anywhere
export default class DataManager{
    static instance = null
    constructor(){
        if(this.instance){
            throw new Error("Singleton cannot have more than one instance")
        }
        this.productList = []
        this.basket = {}
        this.basketCount = 0
        this.sortTypes = {
            name: 2,
            location: 4,
            cost: 5,
            slots: 6
        }
    }
    // returns the one instance of the DataManager class or creates one if it has not been created already
    static getInstance(){
        if(this.instance === null){
            this.instance = new DataManager()
            return this.instance
        }
        return this.instance
    }
    // returns all keys that make up an item in the product list (all the properties of a lesson)
    getKeys = () =>{
        if(this.productList.length > 0){
            return Object.keys(this.productList[0])
        }
        return []
    }
    // sorts the product list by comparing text values
    sortByName = (sortVal, isAsc) =>{
        const keys = this.getKeys()
        this.productList.sort((a, b) =>{
            let smallVal = -1
            let bigVal = 1
            // compared values are made upper case first to prevent disparities due to case differences
            if(a[keys[sortVal]].toUpperCase() < b[keys[sortVal]].toUpperCase()){
                if(isAsc){
                return smallVal
                }else{
                return bigVal
                }
            }
            if(a[keys[sortVal]].toUpperCase() > b[keys[sortVal]].toUpperCase()){
                if(isAsc){
                return bigVal
                }else{
                return smallVal
                }
            }
            return 0
            })
    }
    // sorts by integer or double values
    sortByNumber = (sortVal, isAsc) =>{
        const keys = this.getKeys()
        if(isAsc){
            this.productList.sort((a, b) =>a[keys[sortVal]] - b[keys[sortVal]])
          }else{
            this.productList.sort((a, b) =>b[keys[sortVal]] - a[keys[sortVal]])
          }
    }
    // converts index of select operator in html to an index representing a sort category
    convertToSortType = (key) =>{
        let value
        if(typeof(key) !== 'number'){
            value = parseInt(key)
        }else{
            value = key
        }
        let keys = Object.keys(this.sortTypes)
        return this.sortTypes[keys[value]]
    }
    // sorts the product list
    sort = (sortVal, isAsc) =>{
        let value = this.convertToSortType(sortVal)
        // certain values are sorted by name and others are sorted by number
        if(value === this.sortTypes.name || value === this.sortTypes.location){
            this.sortByName(value, isAsc)
        }else if(value === this.sortTypes.cost || value === this.sortTypes.slots){
            this.sortByNumber(value, isAsc)
        }
        return this.productList
    }
    // changes the product list with a new list
    setProductList = (newList) =>{
        this.productList = newList
    }
    // determines if the product list is different from a provided list
    isProductListDifferent = (listA, listB) =>{
        if(listA.length !== listB.length){
            return true
        }
        for(let i = 0; i < listA.length; i++){
            if(listA[i].lessonId !== listB[i].lessonId){
                return true
            }
        }
        return false
    }
    // returns number of items in the basket
    getBasketCount = () =>{
      return this.basketCount
    }
    // returns the index of an item in the product list
    findProductIdx(name){
        let x = 0
        for(let product of this.productList){
            if(name == product.name){
                break;
            }
            x++
        }
        return x
    }
    // adds an item to the basket
    addToBasket(item){
      if(item.name in this.basket){
        this.basket[item.name].qty += 1
        this.basketCount++
        return this.basket
      }
      this.basket[item.name] = {qty: 1, price: item.cost, name: item.name, lessonId: item.lessonId, maxSlots: item.maxSlots}
      this.basketCount++
      return this.basket
    }
    // removes an item from the  basket
    removeFromBasket(item){
        delete this.basket[item.name]
        return this.basket
    }
}