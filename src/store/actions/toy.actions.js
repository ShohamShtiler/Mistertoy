import { toyService } from '../../services/toy.service'
import {
    ADD_TOY,
    REMOVE_TOY,
    SET_FILTER_BY,
    SET_IS_LOADING,
    SET_SORT_BY,
    SET_TOYS,
    TOY_UNDO,
    UPDATE_TOY,
} from '../reducers/toy.reducer'
import { store } from '../store'

export function loadToys(pageIdx) {
  return (dispatch, getState) => {
    dispatch({ type: 'LOADING_START' })
    const state = getState()
    const { filterBy, sortBy } = state.toyModule

    return toyService.query(filterBy, sortBy, pageIdx)
      .then(res => {
        // console.log('🚀 Loaded toys from backend:', toys)
       dispatch({ type: 'SET_TOYS', toys: res.toys }) // make sure toys is an array
       dispatch({ type: 'SET_MAX_PAGE', maxPage: res.maxPage })
      })
      .catch(err => {
        console.error('❌ Cannot load toys', err)
        throw err
      })
      .finally(() => {
        dispatch({ type: 'LOADING_DONE' })
      })
  }
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId).catch(err => {
        store.dispatch({ type: TOY_UNDO })
        console.log('toy action -> Cannot remove toy', err)
        throw err
    })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toyToSave => {
            store.dispatch({ type, toy: toyToSave })
            return toyToSave
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
  return { type: SET_FILTER_BY, filterBy }
}

export function setSort(sortBy = toyService.getDefaultSort()) {
  return { type: SET_SORT_BY, sortBy }
}
