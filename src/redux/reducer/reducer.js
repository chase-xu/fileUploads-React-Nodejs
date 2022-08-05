import { createAction, createReducer } from '@reduxjs/toolkit'

const increment = createAction('file/increment')
const decrement = createAction('file/decrement')
const getAll = createAction('file/getAll')
const update = createAction('file/update')
const downloadedIncrement = createAction('downloaded/increment')
const downloadedDecrement = createAction('downloaded/decrement')
const archiveToDownloadeFiles = createAction('file/archive')
const initialState = {files: [], downloadedFiles: []}


const fileReducer = createReducer(initialState, async (builder) => {
  builder
    .addCase(increment, (state, action) => {
      const files = [...state.files, ...action.payload]
      files.forEach((item,index)=>{
        item.text = item.name
      })
      return {...state, files: [...files]}
    })
    .addCase(decrement, (state, action) => {
        
      try{
        const id = action.payload.id
        const data = state.files.filter((item, index)=>{
                return item.id !== id
        })
        return {...state, files: [...data]}

      } catch(err){
        console.log(err)
      }
     
    }).addCase(getAll, (state, action)=>{   
      const data = action.payload
      return {...state, files: data}

    }).addCase(update, (state, action)=>{
        const payload = action.payload
        const data = state.files.map((item, index)=>{
            if(item.id === payload.id){
                item.text = payload.text
            }
            return item
        })
        return {...state, files: [...data]}
        
    }).addCase(archiveToDownloadeFiles, (state, action)=>{
        const downloadedFiles = state.downloadedFiles.concat(state.files)
        return {...state, files: [], downloadedFiles: [...downloadedFiles]}
    }).addCase(downloadedIncrement, (state, action)=>{
      const downloadedFiles = [...state.downloadedFiles, ...action.payload]
      return {...state, downloadedFiles: [...downloadedFiles]}
    }).addCase(downloadedDecrement, (state, action)=>{
      try{
        const id = action.payload.id
        const data = state.downloadedFiles.filter((item, index)=>{
                return item.id !== id
        })
        return {...state, downloadedFiles: [...data]}

      } catch(err){
        console.log(err)
      }
    })
    .addDefaultCase((state, action) => {return {...state}})
})

export {increment, decrement};
export default fileReducer;

