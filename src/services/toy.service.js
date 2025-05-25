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
    addToyMsg
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
        inStock: true,
        imgUrl: ''
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

function addToyMsg(toyId, msg) { 
  return httpService.post(`toy/${toyId}/msg`, msg)
}