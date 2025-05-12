// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const TOY_DB = 'toyDB'
const PAGE_SIZE = 4

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

// _createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getToyLabels,
    getToyLabelCounts,
}

function query(filterBy = {}, sortBy = {}, pageIdx = 0) {
    const queryParams = {
        ...filterBy,
        sortBy,
        pageIdx,
    }
    return httpService.get('toy', queryParams)
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}


function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}


function save(toy) {
    if (toy._id) return httpService.put('toy', toy)
    else return httpService.post('toy', toy)
}

function getDefaultFilter() {
    return {
        txt: '',
        inStock: null,
        labels: [],
        pageIdx: 0,
    }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: _getRandomLabels(),
        inStock: true
    }
}

function getToyLabels() {
    return Promise.resolve(labels)
}

function getToyLabelCounts() {
    return storageService.query(TOY_DB).then(toys => {
        const labelCounts = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (!labelCounts[label]) labelCounts[label] = { total: 0, inStock: 0 }
                labelCounts[label].total++
                if (toy.inStock) labelCounts[label].inStock++
            })
        })
        return labelCounts
    })
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const idx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(idx, 1)[0])
    }
    return randomLabels
}



// function _createToys() {
//     let toys = utilService.loadFromStorage(TOY_DB)
//     if (!toys || !toys.length) {
//         toys = [
//             {
//               name: "Benny the Bear",
//               price: 70,
//               labels: ["Puzzle", "Box game"],
//               imgUrl: "bear.png",
//               _id: "FHeoH",
//               createdAt: 1721307706470,
//               inStock: false
//             },
//             {
//               name: "Ella the Elephant",
//               price: 90,
//               labels: ["On wheels", "Outdoor"],
//               imgUrl: "ellephent.png",
//               _id: "r19SU",
//               createdAt: 1720676977009,
//               inStock: false
//             },
//             {
//               name: "Leo the Lion",
//               price: 130,
//               labels: ["Doll", "Battery Powered", "Baby"],
//               imgUrl: "lion.png",
//               _id: "t101",
//               createdAt: 1631031801011,
//               inStock: true
//             },
//             {
//               name: "Ruby the Rabbit",
//               price: 55,
//               labels: ["Puzzle", "Baby"],
//               imgUrl: "rabbit.png",
//               _id: "t102",
//               createdAt: 1631032801011,
//               inStock: true
//             },
//             {
//               name: "Tino the T-Rex",
//               price: 160,
//               labels: ["On wheels", "Battery Powered", "Outdoor"],
//               imgUrl: "dino.png",
//               _id: "t103",
//               createdAt: 1631033801011,
//               inStock: true
//             },
//             {
//               name: "Milo the Panda",
//               price: 60,
//               labels: ["Box game", "Baby"],
//               imgUrl: "panda.png",
//               _id: "t104",
//               createdAt: 1631034801011,
//               inStock: true
//             },
//             {
//                 name: " Gigi the Giraffe",
//                 price: 80,
//                 labels: ["Box game", "Baby"],
//                 imgUrl: "gigi.png",
//                 _id: "t105",
//                 createdAt: 1631034801011,
//                 inStock: false
//               },
//               {
//                 name: "Ollie the Octopus",
//                 price: 75,
//                 labels: ["Box game", "Baby"],
//                 imgUrl: "ollie.png",
//                 _id: "t106",
//                 createdAt: 1631034801011,
//                 inStock: true
//               },
//             {
//               name: "Hanayama Puzzle",
//               price: 45,
//               labels: ["Art", "Box game"],
//               imgUrl: "hanayama-puzzle.jpg",
//               _id: "t107",
//               createdAt: 1631035801011,
//               inStock: false
//             },
//             {
//               name: "Dancing Robot",
//               price: 110,
//               labels: ["Battery Powered", "Outdoor"],
//               imgUrl: "robot.jpg",
//               _id: "t108",
//               createdAt: 1631036801011,
//               inStock: true
//             }
//           ]


//         utilService.saveToStorage(TOY_DB, toys)
//     }

// }