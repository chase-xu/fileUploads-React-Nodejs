import './App.css';
import React from 'react';
import { Button,  Input,  Text, Stack, UnorderedList, ListItem } from '@chakra-ui/react';
import FileBars from './components/fileBars';
import {useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4} from 'uuid';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';



function App() {

  const files = useSelector((state)=>{
    return state.fileReducer.files
  })
  const downloadedFiles = useSelector((state)=>{
    return state.fileReducer.downloadedFiles
  })
  const toast = useToast()
  const dispatch = useDispatch()

  const handleChange=(event)=>{
    const t_files = Object.values(event.target.files)
    const got_files = t_files.map((item, index)=>{
      item.id = uuidv4();
      return item
    })
    dispatch({type: 'file/increment', payload: got_files})
    document.getElementById('input_file').value = []
    // document.getElementById('input_file').files = []

  }

  const handleClick= async (e)=>{
    if(files.length === 0){
      return
    }
    const formData = new FormData();
    for(let i = 0; i < files.length; i++){
      if(files[i].size > 10 * 1024 * 1024 || files[i].size < 1024){
        toast({
          title: `File ${files[i].text}'s size is not valid, file size must be between 1KB to 10MB`,
          status: 'error',
          isClosable: true,
        })
        return
      } else{
        formData.append('file', files[i], files[i].text);
      }
    }

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const url = '/api/v1/upload/'
      axios.post(url, formData, config).then((res) => {
        if(res.status !== 200){
          toast({
            title: `Request Error: ${res.data.message}`,
            status: 'error',
            isClosable: true,
          })
        } else{
          dispatch({type:'file/archive', payload: {}})
          toast({
            title: `Files uploaded.`,
            status: 'success',
            isClosable: true,
          })
        }
      }).catch((err)=>{
        toast({
          title: `Request Error: ${err.response.data.message}`,
          status: 'error',
          isClosable: true,
        })
      });
  }

  const handleOpenFile=(e)=>{
    document.getElementById('input_file').click();
  }


  return (
        <React.Fragment>
          <header style={{
            textAlign:'center',
            marginTop: '5%',
          }}>
            <h1 style={{
              fontSize: '50px',
              fontWeight: '900',
              fontFamily: 'Courier New'
            }}>File Upload
            </h1> 

          </header>
          <UnorderedList spacing={0.1} style={{marginLeft: '30%', 
              marginRight: '30%', marginTop: '2%', fontFamily: 'Sylfaen', fontWeight: 'bold'}}>
            <ListItem>Add files by clicking "Add File" button.</ListItem>
            <ListItem>After files have been added, the files will be displayed under "Selected Files" field.</ListItem>
            <ListItem>Click on name of each selected file to change the name.</ListItem>
            <ListItem>Upload selected files by clicking "Upload" button, files will be saved inside of server/uploads folder.</ListItem>
            <ListItem>Uploaded files will be displayed only after they have been uploaded. Download uploaded files by click the download button.</ListItem>
          </UnorderedList>
          
          <div style={{marginTop: '2%',
              marginLeft: '20%',
              marginRight: '20%',
              border: 'black solid',
              minHeight: '20em',
              display: 'grid',
              gridTemplateRows: '100%'
              }}>

                <div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
                  <div className='left-part' style={{marginTop: '2%', marginLeft: '2%'}}>
                    <Text as='u' mt={1}  style={{fontFamily: 'Sylfaen', fontSize:'2xl'}} ><b>Selected Files</b></Text>
                    <div>
                      {files.length === 0 ? <></>: files.map((item, index)=> <FileBars downloaded={false} desc={item} key={index}/>)}
                    </div>
                    

                  </div>

                  <div className='right-part' style={{display: 'flex',
                      alignItems: 'center', borderLeft: 'solid 2px black', justifyContent: 'center'
                    }}>
                    <form style={{ }}>
                        <Input id='input_file' type="file" multiple="multiple" onChange={handleChange} accept=".css,.html,.js" hidden></Input>
                        <Stack spacing={4} align='center'  style={{display: 'flex', justifyContent:'center'}}>
                          <Button colorScheme='blue' width='100%' size='md' variant="outline" onClick={handleOpenFile}>Add File</Button>
                          <Button colorScheme='teal' width='100%' size='md' onClick={handleClick}>Upload</Button>
                        </ Stack>
                    </form>
                  </div>
                </div>

          </div>

          <div style={{marginLeft: '20%',
              marginRight: '20%',
              border: 'black solid', marginTop: '2%'}}>
          </div>

          <div style={{marginLeft: '20%',
              marginRight: '20%',
              marginTop: '2%'}}>

            {downloadedFiles.length !== 0 ? 
              <Text as='u' mt={1}  style={{fontFamily: 'Sylfaen', fontSize:'2xl'}} ><b>Uploaded Files</b></Text>:<></>}
            {downloadedFiles.length === 0 ? <></>: downloadedFiles.map((item, index)=> <FileBars downloaded={true} desc={item} key={index}/>)}
            

          </div>

        </React.Fragment>
  );
}

export default App;
