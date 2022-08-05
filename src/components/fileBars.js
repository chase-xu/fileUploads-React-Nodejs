import React from 'react';
import { HStack, Box, CloseButton } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Editable from './Editable';
import { FcFile } from "react-icons/fc";
import { RiDownload2Line } from "react-icons/ri";
import { useToast } from '@chakra-ui/react';




const Feature=({ text, id, file, downloaded, ...rest })=> {

    const dispatch = useDispatch();
    const toast = useToast();
    const handleClick = async (event)=>{
        try{
            dispatch({type: 'file/decrement', payload: {id: id, text: text}})
          } catch(err){
            console.log(err)
        }
        
    }


    const handleDownload =(e)=>{
        const url = '/api/v1/download/' + text
        axios.get(url, {
            responseType: 'blob'
        }).then((res) => {
            if(res.status !== 200){
                toast({
                    title: res.statusText,
                    status: 'error',
                    isClosable: true,
                })
                
            } else{
                const fileName = res.headers['content-disposition'].split('filename=')[1].split(';')[0].replaceAll('"', '');
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                if(fileName){
                    link.setAttribute('download', modifyFileName(file.name, fileName));
                }else{
                    link.setAttribute('download', modifyFileName(file.name, text));
                }
                document.body.appendChild(link);
                link.click();
            }
        }).catch((err)=>{
            console.log(err)
            toast({
                title: err,
                status: 'error',
                isClosable: true,
            })
            
        })
    }

    function modifyFileName (oldName, newName){

        const date = new Date()
        const day = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const fullDate = `${day}.${month}.${year}.`;
        const file_li = oldName.split('.')
        if (file_li[0] === newName.split('.')[0]){
            return file_li[0] + '_' + fullDate + file_li[file_li.length -1 ]
        }
        else{
            return  file_li.slice(0, -1).join() + '_' + newName.split('.')[0] + '_' + fullDate + file_li[file_li.length -1];
        }
    }

    return (
        <div style={{width: '100%'}}>
            <Box p={3} shadow='md' borderWidth='1px' borderRadius='md' {...rest} style={{display: 'grid', gridTemplateColumns: '10% 90%', gridColumnGap: '1%', justifyContent: 'center' }} >
                <FcFile size='md' />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Editable text={text} id={id}  file={file} downloaded={downloaded} />
                    {!downloaded ? 
                        <CloseButton size='md' onClick={handleClick}/> 
                        : 
                        <IconButton onClick={handleDownload}> 
                            <RiDownload2Line />
                        </IconButton>}
                </div>
                
            </Box>
        </div>
    )
  }
  
 const StackEx=(props)=> {

    return (
        <div>
            <HStack spacing={8} style={{
                marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: '5%'
            }}>
                <Feature
                text={props.desc.text}
                id={props.desc.id}
                file={props.desc}
                downloaded={props.downloaded}
                />
            </HStack>
        </div>

    )
  } 


export default StackEx;