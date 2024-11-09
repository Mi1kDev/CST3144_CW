export default class DataManager{
    constructor(){
        this.productList = [
            {
              name: "Mathematics",
              description: "Mathematics for beginners",
              location: "103 Address Street",
              cost: 10,
              availableSlots: 5,
              imageURL: '/icons/Calculator.png',
            },
            {
              name: "English",
              description: "English for beginners",
              location: "123 Address Street",
              cost: 20,
              availableSlots: 5,
              imageURL: "",
            },
            {
              name: "Spanish",
              description: "Spanish for beginners",
              location: "123 Address Street",
              cost: 15,
              availableSlots: 5,
              imageURL: "",
            },
            {
              name: "Chemistry",
              description: "Chemistry for beginners",
              location: "123 Address Street",
              cost: 10,
              availableSlots: 5,
              imageURL: "/icons/Chemistry.png",
            },
            {
              name: "Physics",
              description: "Physics for beginners",
              location: "123 Address Street",
              cost: 16,
              availableSlots: 5,
              imageURL: "",
            },
            {
              name: "Biology",
              description: "Biology for beginners",
              location: "123 Address Street",
              cost: 21,
              availableSlots: 5,
              imageURL: "",
            },
            {
              name: "Mechanical Engineering",
              description: "Mechanical Engineering for beginners",
              location: "123 Address Street",
              cost: 20,
              availableSlots: 5,
              imageURL: "",
            },
            {
              name: "IT",
              description: "IT for beginners",
              location: "123 Address Street",
              cost: 25,
              availableSlots: 5,
              imageURL: "",
            },
            {
              name: "Computer Science",
              description: "Computer Science for beginners",
              location: "123 Address Street",
              cost: 20,
              availableSlots: 5,
              imageURL: "",
            },
            {
              name: "French",
              description: "French for beginners",
              location: "123 Address Street",
              cost: 8,
              availableSlots: 5,
              imageURL: "",
            },
            
          ]
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
}