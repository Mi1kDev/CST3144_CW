export default class DataManager{
    static instance = null
    constructor(){
        if(this.instance){
            throw new Error("Singleton cannot have more than one instance")
        }
        this.productList = []
        this.basket = {}
        this.basketCount = 0
    }
    static getInstance(){
        if(this.instance === null){
            this.instance = new DataManager()
            return this.instance
        }
        return this.instance
    }
    getKeys = () =>{
        if(this.productList.length > 0){
            return Object.keys(this.productList[0])
        }
        return []
    }
    sortByName = (sortVal, isAsc) =>{
        const keys = this.getKeys()
        this.productList.sort((a, b) =>{
        let smallVal = -1
        let bigVal = 1
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
    sortByNumber = (sortVal, isAsc) =>{
        const keys = this.getKeys()
        if(isAsc){
            this.productList.sort((a, b) =>a[keys[sortVal]] - b[keys[sortVal]])
          }else{
            this.productList.sort((a, b) =>b[keys[sortVal]] - a[keys[sortVal]])
          }
    }
    sort = (sortVal, isAsc) =>{
        let value = sortVal
        if(typeof(sortVal) !== 'number'){
            value = parseInt(sortVal)
        }
        if(value === 0 || value === 2){
            this.sortByName(value, isAsc)
        }else if(value == 3 || value == 4){
            this.sortByNumber(value, isAsc)
        }
        return this.productList
    }

    setProductList = (newList) =>{
        this.productList = newList
    }

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

    getBasketCount = () =>{
      return this.basketCount
    }
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
    removeFromBasket(item){
        delete this.basket[item.name]
        return this.basket
    }
}