import { api } from '../api'

export const getAllStudents = async () => {
  return api.get('/dummy/students').then((response) => {
    return response.data
  })
}