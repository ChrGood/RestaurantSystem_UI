import { getDishType } from '@/api/dish'
// VUEX中的DISH
const getDefaultState = () => {
  return {
    dishType: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_DISHTYPE: (state, data) => {
    state.dishType = data
  }
}

const actions = {
  getDishType({ commit }) {
    return new Promise((resolve, reject) => {
      getDishType().then(response => {
        const data = response.Data
        if (!data) {
          return reject('缺少菜品类型数据！')
        }
        commit('SET_DISHTYPE', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

